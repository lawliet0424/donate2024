package com.hikdonate.donate.domain.beneficiary.service;

import com.hikdonate.donate.domain.beneficiary.domain.Beneficiary;
import com.hikdonate.donate.domain.beneficiary.dto.BeneficiarySimpleResponse;
import com.hikdonate.donate.domain.beneficiary.repository.BeneficiaryRepository;
import com.hikdonate.donate.domain.tag.domain.TagLink;
import com.hikdonate.donate.domain.tag.dto.tagResponse.TagItem;
import com.hikdonate.donate.domain.tag.repository.TagLinkRepository;
import com.hikdonate.donate.domain.transaction.repository.TransactionHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BeneficiaryInfoService {

    private final TransactionHistoryRepository transactionHistoryRepository;
    private final BeneficiaryRepository beneficiaryRepository;
    private final TagLinkRepository tagLinkRepository;
    private final ConvertService convertService;

    /*
    Function name: selectedBeneficiariesList
    Summary: 기부 금액 정보를 제거한 후 DTO로 변환
    Parameter: 3개
        List<String> beneficiary_list : 태그에 해당되는 수혜자 web3 지갑 리스트
        int numOfBeneficiaries : 선택하고자하는 N명의 수혜자
    Return: List<String>
    Caller: DonationListUpController
    Date: 2024.10.12 (Updated by 심민서)
    Written by: 조현지
    */
    public List<BeneficiarySimpleResponse> selectedBeneficiariesList(List<Long> tagIds, int numOfBeneficiaries, String donor_id) {
        System.out.println(" selectedBeneficiariesList 시작");
        // 현재 시각으로부터 2주 전의 시각
        String fromDate = calculateRecentTwoWeeks();

        // 태그에 해당되는 수혜자를 정렬한 뒤, 상위 N명에 대해서만 뽑아서 수혜자 web3 지갑 리스트 반환
        if (tagIds == null || tagIds.isEmpty()) {
            return List.of(); // 빈 리스트 반환
        }
        List<Beneficiary> tagged_beneficiary_list = tagLinkRepository.findBeneficiariesByTagIds(tagIds);
        System.out.println(" tagged_beneficiary_list " + tagged_beneficiary_list );

        List<String> tagged_beneficiaries_wallet_addr  = new ArrayList<>();
        // tagged_beneficiary_list의 각 수혜자에 대해 지갑 주소를 추가
        for (Beneficiary beneficiary : tagged_beneficiary_list) {
            tagged_beneficiaries_wallet_addr.add(beneficiary.getBeneficiaryWallet());
        }
        System.out.println(" tagged_beneficiaries_wallet_addr " + tagged_beneficiaries_wallet_addr );

        // 태그에 해당되는 수혜자를 정렬한 뒤, 상위 N명에 대해서만 뽑아서 수혜자 web3 지갑 리스트 반환
        List<String> sortedBeneficiariesWalletAddress = transactionHistoryRepository.findTopBeneficiariesWalletAddressByDonation(tagged_beneficiaries_wallet_addr, fromDate);
        System.out.println("sorted: " + sortedBeneficiariesWalletAddress);

        // 최근 2주간의 기부 내역이 없거나 기부받은 내역이 없는 수혜자 처리
        for (String beneficiary : tagged_beneficiaries_wallet_addr) {
            if (sortedBeneficiariesWalletAddress.stream().noneMatch(result -> result.equals(beneficiary))) {
                sortedBeneficiariesWalletAddress.add(0, beneficiary); // 없는 beneficiary에 대해 totalAmount를 0으로 추가
            }
        }
        System.out.println("sorted: " + sortedBeneficiariesWalletAddress);

        // slice out of bound 오류 처리
        if (sortedBeneficiariesWalletAddress.size() < numOfBeneficiaries || sortedBeneficiariesWalletAddress.isEmpty()) {
            throw new IndexOutOfBoundsException("Requested N cannot be processed due to short sortedBeneficiariesWalletAddress");
        }

        // slicing 처리
        List<String> topBeneficiariesWalletAddress = sortedBeneficiariesWalletAddress.subList(0, numOfBeneficiaries);
        System.out.println("top N: " + topBeneficiariesWalletAddress);

        List<BeneficiarySimpleResponse> taggedBeneficiaries = new ArrayList<>();

        for (String walletAddr : topBeneficiariesWalletAddress){
            Beneficiary beneficiary = beneficiaryRepository.findByBeneficiaryWallet(walletAddr);
            System.out.println("findByBeneficiaryWallet(walletAddr) " + beneficiary);
            if (beneficiary != null) {
                // 태그 링크를 찾기 위해 TagLinkRepository를 사용
                List<TagLink> tagLinks = tagLinkRepository.findByBeneficiary(beneficiary);

                // TagLink로부터 TagItem 생성
                List<TagItem> tags = tagLinks.stream()
                        .map(tagLink -> new TagItem(tagLink.getTag().getTagId(), tagLink.getTag().getTagName()))
                        .collect(Collectors.toList());

                boolean isInterested = convertService.convertToIsInterested(beneficiary, donor_id);
                System.out.println("isInterested 세팅: " + isInterested);
                System.out.println("tagIds = " + tagIds + ", numOfBeneficiaries = " + numOfBeneficiaries + ", donor_id = " + donor_id);
                // 컨테이너에 추가
                BeneficiarySimpleResponse container = new BeneficiarySimpleResponse(beneficiary, tags, isInterested);
                taggedBeneficiaries.add(container);
                System.out.println("container " + container);
            }
        }
        return taggedBeneficiaries;
    }


    /*
    Function name: selectedBeneficiariesList
    Summary: 현재 시각으로부터 2주 전의 시각 구하기
    Parameter: None
    Return: String
    Caller: selectedBeneficiariesList
    Date: 2024.09.21
    Written by: 조현지
    */
    public String calculateRecentTwoWeeks() {
        // 현재 시각 뽑기
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime twoWeeksAgo = now.minusWeeks(2);

        // LocalDateTime을 Date 형식으로 변환
        Date fromDate = Date.from(twoWeeksAgo.atZone(ZoneId.systemDefault()).toInstant());

        // Date를 Unix 타임스탬프 형식으로 변환
        long fromDateTimestamp = twoWeeksAgo.atZone(ZoneId.systemDefault()).toEpochSecond();
        System.out.println("Time limit: " + fromDateTimestamp);
        return String.valueOf(fromDateTimestamp);
    }



}

