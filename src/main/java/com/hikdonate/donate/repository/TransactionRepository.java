package com.hikdonate.donate.repository;

import com.hikdonate.donate.domain.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TransactionRepository extends MongoRepository<Transaction, String> {
}
