package com.hikdonate.donate.domain.transaction.repository;

import com.hikdonate.donate.domain.transaction.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface TransactionRepository extends MongoRepository<Transaction, String> {

    // 찾고자하는 BeneficiaryWallterAddress를 가지는 Transaction 문서 리스트 가져오기 (timestamp, amount 필드 값만 가져옴)
    @Query(value="{beneficiary_wallet: '?0'}", fields="{'timestamp' : 1, 'amount' : 1}")
    List<Transaction> findAllBeneficiaryDonationHistory(String beneficiaryWalletAddress);

    // 찾고자하는 DonorWallterAddress를 가지는 Transaction 문서 리스트 가져오기 (timestamp, amount필드 값만 가져옴)
    @Query("{donor_wallet: '?0'}")
    List<Transaction> findAllDonorDonationHistory(String donorWalletAddress);

    Transaction save(Transaction transaction);
}
