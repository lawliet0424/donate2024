package com.hikdonate.donate.domain.transaction.service;

import com.hikdonate.donate.domain.transaction.domain.Transaction;
import com.hikdonate.donate.domain.transaction.repository.TransactionHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {
    @Autowired
    private TransactionHistoryRepository transactionRepository;

    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }
}
