package com.hikdonate.donate.domain.transaction.service;

import com.hikdonate.donate.domain.beneficiary.repository.BeneficiaryRepository;
import com.hikdonate.donate.domain.transaction.dto.DonationSummary;
import com.hikdonate.donate.domain.transaction.repository.TransactionHistoryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class DonationSummaryService extends BasicDonationService {

    public DonationSummaryService(BeneficiaryRepository beneficiaryRepository, TransactionHistoryRepository transactionHistoryRepository) {
        super(beneficiaryRepository, transactionHistoryRepository);
    }

    /*
    Function name: summaryDonorDonationHistory
    Summary: 현재 로그인한 기부자의 기부 내역을 트랜잭션 id별로 요약해서 전달
    Parameter: 1개
        String donorWalletAddr : 기부자의 wallet address
    Return: List<DonationSummary>
    Caller: DonorController
    Date: 2024.10.22
    Written by: 조현지
    */
    public List<DonationSummary> summaryDonorDonationHistory(String donorWalletAddr) {
        // 수혜자 리스트 = [ 수혜자의 wallet address ]
        List<DonationSummary> donationHistoryWithWalletAddr = transactionHistoryRepository.findAllDonorDonationHistory(donorWalletAddr);

        List<DonationSummary> donationHistoryWithName = donationHistoryWithWalletAddr.stream()
                .map(donationSummary -> {
                    List<String> beneficiaryListWithName = donationSummary.getBeneficiaryList().stream()
                            .map(beneficiaryWithWalletAddr -> searchBeneficiaryNameFromWalletAddr(beneficiaryWithWalletAddr))
                            // stream 객체를 List 객체로 타입 변환
                            .collect(Collectors.toList());

                    // 수혜자 리스트 = [ 수혜자의 이름 ]
                    // beneficiaryList 변수에 변환된 beneficiaryListWithName 리스트 넣기
                    donationSummary.setBeneficiaryList(beneficiaryListWithName);
                    // 변환된 beneficiaryListWithName가 담긴 donationSummary 객체 반환
                    return donationSummary;
                })
                // stream 객체를 List 객체로 타입 변환
                .collect(Collectors.toList());

        return donationHistoryWithName;
    }
}
