package com.hikdonate.donate.transaction.repository;

import com.hikdonate.donate.transaction.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TransactionRepository extends MongoRepository<Transaction, String> {
}
