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
        기부 금액 정보를 제거한 후 DTO로 변환
        */
        public List<String> selectedBeneficiariesList(List<String> beneficiary_list, int numOfBeneficiaries) {
            // 현재 시각으로부터 2주 전의 시각
            String fromDate = calculateRecentTwoWeeks();

            List<String> topBeneficiariesWalletAddress = transactionRepository.findTopBeneficiariesWalletAddressByDonation(beneficiary_list, fromDate, numOfBeneficiaries);
            System.out.println("top N: " + topBeneficiariesWalletAddress);

            //-----남은 과정 : TaggedBeneficiaryContainer (DTO)에 선택된 수혜자들의 정보 담기.

            return topBeneficiariesWalletAddress;
        }

        /*
        현재 시각으로부터 2주 전의 시각 구하기
        */
        public String calculateRecentTwoWeeks() {

            LocalDateTime now = LocalDateTime.now();
            LocalDateTime twoWeeksAgo = now.minusWeeks(2);

            // LocalDateTime을 Date로 변환
            Date fromDate = Date.from(twoWeeksAgo.atZone(ZoneId.systemDefault()).toInstant());
            // Date를 ISO 8601 형식으로 변환
            DateTimeFormatter formatter = DateTimeFormatter.ISO_OFFSET_DATE_TIME;
            String fromDateString = twoWeeksAgo.atZone(ZoneId.systemDefault()).format(formatter);

            System.out.println("Time limit: " + fromDateString);
            return fromDateString;
        }
}

