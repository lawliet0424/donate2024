package com.hikdonate.donate.domain.transaction.service;

import com.hikdonate.donate.domain.transaction.domain.Transaction;
import com.hikdonate.donate.domain.transaction.repository.TransactionHistoryRepository;
import lombok.extern.slf4j.Slf4j;


import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.math.BigInteger;

/*
Edit by: 양예현
Edit date: 24.10.13
Summary: saveTransaction 함수 추가
 */
@Slf4j
@Service
public class TransactionService {
    @Autowired
    private MongoTemplate mongoTemplate;

    /*
     Function name: saveTransaction
     Summary: 발생시킨 트랜잭션의 정보를 mongodb에 저장
     Parameter:
     Return: Transaction
     Date: 2024.10.13
     Written by: 양예현
     */
    public void saveTransaction(String jsonResponse) {
        // 로그 추가
        System.out.println("Entering saveTransaction method");

        // 응답을 JSON으로 변환
        JSONObject jsonObject = new JSONObject(jsonResponse);
        JSONArray jsonArray = jsonObject.getJSONArray("result");
        System.out.println(jsonArray);
        System.out.println(jsonArray.length());

        // Transaction 객체 생성 및 데이터 설정
        for (int i = 0 ; i < jsonArray.length() ; i++) {
            JSONObject transactionJson = jsonArray.getJSONObject(i);
            Transaction transaction = new Transaction();
            transaction.setDonorWallet(transactionJson.getString("from"));
            transaction.setBeneficiariesWallet(transactionJson.getString("to"));
            transaction.setTransactionHash(transactionJson.getString("hash"));
            transaction.setAmount(new BigInteger(transactionJson.getString("value")).divide(BigInteger.valueOf(100)).intValue());
            transaction.setTimeStamp(Long.parseLong(transactionJson.getString("timeStamp")));

            // 저장 전 로그 추가
            System.out.println("Transaction to be saved: " + transaction);

            // 트랜잭션 저장
            try {
                mongoTemplate.save(transaction);
                log.info("Saved transaction");
            } catch (Exception e) {
                log.error("Error saving transaction: " + e.getMessage());
            }
        }

    }
}
