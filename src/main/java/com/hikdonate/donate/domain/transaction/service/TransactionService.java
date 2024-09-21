package com.hikdonate.donate.domain.transaction.service;

import com.hikdonate.donate.domain.transaction.Transaction;
import com.hikdonate.donate.domain.transaction.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }
}