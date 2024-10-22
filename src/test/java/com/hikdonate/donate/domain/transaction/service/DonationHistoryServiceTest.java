package com.hikdonate.donate.domain.transaction.service;

import com.hikdonate.donate.domain.transaction.dto.DonationSummary;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class DonationHistoryServiceTest {
    @Autowired
    DonationSummaryService donationSummaryService;

    @Test
    public void testDonorTransactionHistory() {
        // set
        String testDonorAddress = "0x6119f6f80e1460d8ebdf921f82c1ee782d3bd261";
        List<DonationSummary> result = donationSummaryService.summaryDonorDonationHistory(testDonorAddress);

        // 검증 로직
        Assertions.assertNotNull(result);
        Assertions.assertFalse(result.isEmpty(), "Result list is empty");

        // 결과 보이기
        result.forEach(dto -> {
            System.out.println(
                    "transaction hash: "
                            + dto.getHistoryId()
                            + "\n total amount: "
                            + dto.getTotalAmount()
                            + "\n total beneficiary num: "
                            + dto.getNumberOfPeople()
                            + "\n beneficiary list: "
                            + dto.getBeneficiaryList()
                            + "\n date: "
                            + dto.getDate()
                            + "\n"
            );
        });
    }
}
