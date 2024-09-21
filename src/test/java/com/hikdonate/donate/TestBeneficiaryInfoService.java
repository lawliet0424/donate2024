package com.hikdonate.donate;

import com.hikdonate.donate.domain.beneficiary.service.BeneficiaryInfoService;
import com.hikdonate.donate.domain.transaction.repository.TransactionHistoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.function.Function;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class TestBeneficiaryInfoService {

    @Autowired
    private TransactionHistoryRepository transactionHistoryRepository;

    @Autowired
    private BeneficiaryInfoService beneficiaryInfoService;

    @BeforeEach
    public void beforeEach() {
        beneficiaryInfoService = new BeneficiaryInfoService(transactionHistoryRepository);
    }

    @Test
    public void testFindTopBeneficiariesWalletAddressByDonation() {
        // given
        List<String> beneficiaryWallets = Arrays.asList("beneficiary_wallet_1", "beneficiary_wallet_2", "beneficiary_wallet_3");
        int numOfBeneficiaries = 2;

        // when
        List<String> result = beneficiaryInfoService.selectedBeneficiariesList(beneficiaryWallets, numOfBeneficiaries);

        // then
        List<String> expectedResult = Arrays.asList("beneficiary_wallet_2", "beneficiary_wallet_3");
        assertThat(result).isEqualTo(expectedResult);
    }

    @Test
    public void testCheckTime() {
        // given
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime twoWeeksAgo = now.minusWeeks(2).minusHours(1);

        // LocalDateTime을 Date로 변환
        Date fromDate = Date.from(twoWeeksAgo.atZone(ZoneId.systemDefault()).toInstant());
        // Date를 ISO 8601 형식으로 변환
        DateTimeFormatter formatter = DateTimeFormatter.ISO_OFFSET_DATE_TIME;
        String checking = twoWeeksAgo.atZone(ZoneId.systemDefault()).format(formatter);


        // when
        String result = beneficiaryInfoService.calculateRecentTwoWeeks();

        // then
        assertThat(result).isGreaterThan(checking);
    }
}
