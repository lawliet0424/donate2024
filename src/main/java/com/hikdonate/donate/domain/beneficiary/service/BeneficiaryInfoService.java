package com.hikdonate.donate.domain.beneficiary.service;

import com.hikdonate.donate.domain.tag.repository.TaggedBeneficiaryContainer;
import com.hikdonate.donate.domain.transaction.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Service
public class BeneficiaryInfoService {

    private final TransactionRepository transactionRepository;

        /*
        기부 금액 정보를 제거한 후 DTO로 변환
        */
        List<TaggedBeneficiaryContainer> selectedBeneficiariesList(List<String> beneficiary_list, int numOfBeneficiaries) {
            // 현재 시각으로부터 2주 전의 시각
            Date fromDate = calculateRecentTwoWeeks();

            List<String> topBeneficiariesWalletAddress = transactionRepository.findTopBeneficiariesWalletAddressByDonation(beneficiary_list, fromDate, numOfBeneficiaries);

            //-----남은 과정 : TaggedBeneficiaryContainer (DTO)에 선택된 수혜자들의 정보 담기.

            return null;
        }

        /*
        현재 시각으로부터 2주 전의 시각 구하기
        */
        Date calculateRecentTwoWeeks() {
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime twoWeeksAgo = now.minusWeeks(2);

            // LocalDateTime을 Date로 변환
            Date fromDate = Date.from(twoWeeksAgo.atZone(ZoneId.systemDefault()).toInstant());
            return fromDate;
        }
}

