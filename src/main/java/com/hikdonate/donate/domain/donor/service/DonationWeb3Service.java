package com.hikdonate.donate.domain.donor.service;

import com.hikdonate.donate.domain.transaction.domain.Transaction;
import com.hikdonate.donate.web3j.web3jAPI.contracts.DonateManagement;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.bson.Document;
import org.bson.json.JsonObject;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.RawTransactionManager;
import org.web3j.tx.gas.DefaultGasProvider;


import java.math.BigInteger;
import java.util.List;

/*
Class name: DonationWeb3Service
Summary: Smart Contract (Java Wrapping된 것) 호출 함수 모음
Date: 2024.09.10
Written by: 심민서

Edit by: 양예현
Edit date: 2024.10.15
Summary: 트랜잭션 정보를 bscscan api 통해 가져오기
*/
@Service
@RequiredArgsConstructor
public class DonationWeb3Service {

    @Value("${admin.api-key}")
    private String bscscanApiKey;
    private String bscscanApiUrl = "https://api-testnet.bscscan.com/api";

    /*
    Function name: getTransactionFromBscScan
    Summary: 기부자의 기부 내역 트랜잭션을 bscscan api를 통해 가져온다
    Parameter: 총 2개
        String donorId; 기부한 기부자의 wallet 주소
        int beneficiares; 기부자가 선택한 수혜자 인원 수
    Return: Document(JSON)
    Caller: executeDonationTransaction
    Date: 2024.10.15
    Write by: 양예현
     */
    // BscScan API로부터 트랜잭션 정보 가져오기
    public JSONObject getTransactionFromBscScan(String donorId, int beneficiaries) {
        try {
            String apiUrl = bscscanApiUrl
                    + "?module=account&action=tokentx"
                    + "&contractaddress=0xbf24632D2B5Ca6A810864feE00429C0B3a72Fe5C"
                    + "&address=" + donorId
                    + "&apikey=" + bscscanApiKey
                    + "&sort=desc"
                    + "&page=1"
                    + "&offset=" + beneficiaries;
            System.out.println(apiUrl);
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.getForEntity(apiUrl, String.class);

            if (response.getStatusCode().is2xxSuccessful()) { //BSC에서 가져오기 성공
                String jsonResponse = response.getBody();
                return new JSONObject(jsonResponse);
            } else {
                System.err.println("Error fetching transaction from BscScan: " + response.getStatusCode());
                return null;
            }
        } catch (Exception e) {
            System.err.println("Exception during BscScan API call: " + e.getMessage());
            return null;
        }
    }

    @Value("${admin.address}")
    private String fromAddress; // Owner 주소

    @Value("${donateManagement.address}")
    private String donateManagement_addr;

    @Value("${admin.private-key}")
    private String privKey;

    private final Web3j web3j;
    private final Credentials credentials;
    private DonateManagement donateManagement;

    private final MongoTemplate mongoTemplate;

    /*
    Function name: init
    Summary: 스마트 컨트랙트 초기화
    Parameter: 없음
    Return: 없음
    Caller: Donate2024Application
    Date: 2024.9.10
    Write by: 심민서
    */
    @PostConstruct
    private void init() {
        long chainId = 97;
        RawTransactionManager rawTransactionManager = new RawTransactionManager(web3j, credentials, chainId);

        // Wrapper로 감싸진 스마트 컨트랙트(ABI 파일)를 통해, 테스트넷 상의 스마트 컨트랙트를 가져오기
        donateManagement = DonateManagement.load(donateManagement_addr, web3j, rawTransactionManager, new DefaultGasProvider());
    }


    /*
    Function name: sendTokenToDonor
    Summary: 트랜잭션 1단계
    Return: 총 1개; 성공 여부
    Caller: DonateStateService.executeDonationTransaction
    Date: 2024.9.10
    Write by: 심민서
    */
    public String sendTokenToDonor(String donor, Long total_amount) throws Exception {
        String result = "";
        try {
            if (donateManagement.sendTokensToDonor(donor, BigInteger.valueOf((long) total_amount)).send().isStatusOK()){
                result = "success";
            }
        } catch (Exception e)  {
            System.out.println("Revert: " + e.getMessage());
            result = e.getMessage();
        }
        return result;
    }

    /*
    Function name: sendTokensToBeneficiaryAndDonateBank
    Summary: 트랜잭션 2&3단계
    Return: 총 1개; 성공 여부
    Caller: DonateStateService.executeDonationTransaction
    Date: 2024.9.10
    Write by: 심민서

    Edit by: 양예현
    Edit date: 2024.10.13
    Summary: MongoDB에 저장하기 위해 TransactionReceipt를 반환하도록 함수 수정
    */
    public TransactionReceipt sendTokensToBeneficiaryAndDonateBank(String donor, String[] beneficiaries, Long divided_amount) throws Exception {
        String result="";
        TransactionReceipt transactionReceipt = null;

        int num_of_beneficiaries = 0;
        if (beneficiaries!= null) num_of_beneficiaries = beneficiaries.length;
        if (num_of_beneficiaries == 1){ // 단일 기부
            try {
                transactionReceipt = donateManagement
                        .triggerSendTokensToBeneficiaryAndDonateBank(donor, beneficiaries[0], BigInteger.valueOf((long) divided_amount))
                        .send();
                if (transactionReceipt.isStatusOK()){
                    result = "success";
                }
            } catch (Exception e) {
                System.out.println("Revert: " + e.getMessage());
                result = e.getMessage();
            }
        } else { // 다중 기부
            try {
                assert beneficiaries != null;
                transactionReceipt = donateManagement
                        .triggerSendTokensToBeneficiaryAndDonateBank(donor, beneficiaries[0], BigInteger.valueOf((long) divided_amount))
                        .send();
                if (donateManagement.triggerSendBatchTokensToBeneficiaryAndDonateBank(donor, List.of(beneficiaries), BigInteger.valueOf((long) divided_amount)).send().isStatusOK()) {
                    result = "success";
                }
            } catch (Exception e) {
                System.out.println("Revert: " + e.getMessage());
                result = e.getMessage();
            }
        }
        System.out.println(result);
        return transactionReceipt;
    }

    /*
    Function name: sendTokensToBeneficiary
    Summary: 트랜잭션 2단계
    Return: 총 1개; 성공 여부
    Caller: DonateStateService.executeDonationTransaction
    Date: 2024.9.10
    Write by: 심민서


    */
    public String sendTokensToBeneficiary(String donor, String[] beneficiaries, Long divided_amount) throws Exception {
        String result="";

        try {
            if (donateManagement.sendTokensToBeneficiary(donor, List.of(beneficiaries).toString(), BigInteger.valueOf((long) divided_amount)).send().isStatusOK()) {
                result = "success";
            }
        } catch (Exception e) {
            System.out.println("Revert: " + e.getMessage());
            result = e.getMessage();
        }
        return result;
    }

    /*
    Function name: sendTokensToDonateBank
    Summary: 트랜잭션 3단계
    Return: 총 1개; 성공 여부
    Caller: DonateStateService.executeDonationTransaction
    Date: 2024.9.10
    Write by: 심민서

    Edit by: 양예현
    Edit date: 2024.10.23
    */
    public String sendTokensToDonateBank(String donor, String[] beneficiaries, Long divided_amount) throws Exception {
        String result="";

        try {
            if (donateManagement.sendTokensToDonateBank(List.of(beneficiaries).toString(), BigInteger.valueOf((long) divided_amount)).send().isStatusOK()) {
                result = "success";
            }
        } catch (Exception e) {
            System.out.println("Revert: " + e.getMessage());
            result = e.getMessage();
        }
        return result;
    }

}