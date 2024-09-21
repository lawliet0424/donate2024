package com.hikdonate.donate;

import com.hikdonate.donate.domain.transaction.domain.Transaction;
import com.hikdonate.donate.domain.transaction.repository.TransactionRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@ExtendWith(SpringExtension.class)
@DataMongoTest
public class MongoDBConnectionTest {

    @Autowired
    private TransactionRepository transactionRepository;

    @Test
    public void testMongoDBConnection() {
        Transaction transaction = new Transaction("123456", "2024-07-28T12:34:56", "donor_wallet_1", "beneficiary_wallet_1", 100);
        transactionRepository.save(transaction);

        //조회
        List<Transaction> transactions = transactionRepository.findAll();
        assertThat(transactions).isNotNull();
        assertThat(transactions.get(0).getBlockNumber()).isEqualTo("123456");
    }

}
