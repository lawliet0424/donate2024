package com.hikdonate.donate.domain.transaction.repository;

import com.hikdonate.donate.domain.transaction.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TransactionRepository extends MongoRepository<Transaction, String> {
}
