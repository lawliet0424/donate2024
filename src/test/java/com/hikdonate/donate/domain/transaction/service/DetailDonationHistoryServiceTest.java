package com.hikdonate.donate.domain.transaction.service;

import com.hikdonate.donate.domain.transaction.dto.DonationDetail;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class DetailDonationHistoryServiceTest {
    @Autowired
    DonationDetailService donationDetailService;

    @Test
    public void testDonorTransactionHistory() {
        // set
        String testTransactionHash = "0x5a315d2d230eebac9720f11938b39ece719013e83a5293a299edf46b5ba6bf7f";
        List<DonationDetail> result = donationDetailService.allTransactionDetailHistory(testTransactionHash);

        // 검증 로직
        Assertions.assertNotNull(result);
        Assertions.assertFalse(result.isEmpty(), "Result list is empty");

        // 결과 보이기
        result.forEach(dto -> {
            System.out.println(
                    "transaction hash: "
                            + "SELECTED BY USER"
                            + "\n beneficiary name: "
                            + dto.getBeneficiaryName()
                            + "\n amount Per Person: "
                            + dto.getAmountPerPerson()
                            + "\n donor wallet address: "
                            + dto.getWalletFrom()
                            + "\n beneficiary wallet address: "
                            + dto.getWalletTo()
                            + "\n date: "
                            + dto.getDate()
                            + "\n transaction Link: "
                            + dto.getTxLink()
                            + "\n transaction status: "
                            + dto.getStatus()
                            + "\n"
            );
        });
    }
}

