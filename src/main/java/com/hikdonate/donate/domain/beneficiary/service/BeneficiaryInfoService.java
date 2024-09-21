package com.hikdonate.donate.domain.beneficiary.service;

import com.hikdonate.donate.domain.tag.repository.TaggedBeneficiaryContainer;
import com.hikdonate.donate.domain.transaction.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Service
public class BeneficiaryInfoService {

    private final TransactionRepository transactionRepository;

        /*
        Function name: selectedBeneficiariesList
        Summary: 기부 금액 정보를 제거한 후 DTO로 변환
        Parameter: 3개
            List<String> beneficiary_list : 태그에 해당되는 수혜자 web3 지갑 리스트
            int numOfBeneficiaries : 선택하고자하는 N명의 수혜자
        Return: List<String>
        Caller: DonationListUpController
        Date: 2024.09.21
        Written by: 조현지
        */
        public List<String/*Test용 DTO로 대체될 예정*/> selectedBeneficiariesList(List<String> beneficiary_list, int numOfBeneficiaries) {

            //-----남은 과정 : 수혜자 ID가 담긴 DTO 리스트를 바탕으로 레포지토리에서 수혜자 web3 지갑 가져온 뒤, 리스트로 만들기

            // 현재 시각으로부터 2주 전의 시각
            String fromDate = calculateRecentTwoWeeks();

            // 태그에 해당되는 수혜자를 정렬한 뒤, 상위 N명에 대해서만 뽑아서 수혜자 web3 지갑 리스트 반환
            List<String> topBeneficiariesWalletAddress = transactionRepository.findTopBeneficiariesWalletAddressByDonation(beneficiary_list, fromDate, numOfBeneficiaries);
            System.out.println("top N: " + topBeneficiariesWalletAddress);

            //-----남은 과정 : TaggedBeneficiaryContainer (DTO)에 선택된 수혜자들의 정보 담기.

            return topBeneficiariesWalletAddress/*Test용 DTO로 대체될 예정*/;
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

            // Date를 ISO 8601 형식으로 변환
            DateTimeFormatter formatter = DateTimeFormatter.ISO_OFFSET_DATE_TIME;
            String fromDateString = twoWeeksAgo.atZone(ZoneId.systemDefault()).format(formatter);
            System.out.println("Time limit: " + fromDateString);
            return fromDateString;
        }
}

