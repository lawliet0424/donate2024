package com.hikdonate.donate.domain.transaction.repository;

import com.hikdonate.donate.domain.transaction.dto.DonationSummary;
import com.hikdonate.donate.domain.transaction.dto.TransactionDetail;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class TransactionHistoryRepositoryTest {
    @Autowired
    private TransactionHistoryRepository transactionHistoryRepository;

    @Test
    public void testDonorTransactionHistory() {
        // set
        String testDonorAddress = "0x6119f6f80e1460d8ebdf921f82c1ee782d3bd261";
        List<DonationSummary> result = transactionHistoryRepository.findAllDonorDonationHistory(testDonorAddress);

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

    @Test
    public void testTransactionHashHistory() {
        // set
        String testTransactionHash = "0x5a315d2d230eebac9720f11938b39ece719013e83a5293a299edf46b5ba6bf7f";
        List<TransactionDetail> result = transactionHistoryRepository.findAllTransactionByTransactionHash(testTransactionHash);

        // 검증 로직
        Assertions.assertNotNull(result);
        Assertions.assertFalse(result.isEmpty(), "Result list is empty");

        // 결과 보이기
        result.forEach(dto -> {
            System.out.println(
                    "transaction hash: "
                            + "SELECTED BY USER"
                            + "\n amount: "
                            + dto.getAmountPerPerson()
                            + "\n donor wallet address: "
                            + dto.getWalletFrom()
                            + "\n beneficiary wallet address: "
                            + dto.getWalletTo()
                            + "\n date: "
                            + dto.getDate()
                            + "\n"
            );
        });
    }
}
