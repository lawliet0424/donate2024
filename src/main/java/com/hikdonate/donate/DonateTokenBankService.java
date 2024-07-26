package com.hikdonate.donate;

import com.hikdonate.contracts.DonateTokenBank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.ClientTransactionManager;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.DefaultGasProvider;

import java.math.BigInteger;

/*
Class name: DonateTokenBankService
Summary: Sepolia testnet의 DonateTokenBank 스마트 계약을 가져오며 이때, 로컬에 저장된 DonateTokenBank(java wrapper)를 이용하기
Date: 2024.07.26
Written by: 조현지
*/
@Service
public class DonateTokenBankService {
    @Autowired
    private Web3j web3j;

    // [하드코딩] -- credential을 통해 load하면 transactionmanager 없이, Annotation만으로 컨트랙트를 가져올 수 있음
    private final String contractAddress = "0xE47c8606fCbd06A51C3Ff44f5cdc6bE10eE65752";
    private final String fromAccountAddress = "0x3BF5FB83f7A8b00C42Ad499FF6737774d9e08AF7";

    /*
    Function name: loadContract
    Summary: Sepolia testnet의 DonateTokenBank 스마트 계약을 가져오는 함수
    Parameter: 없음
    Return: 총 1개, DonateTokenBank(Java Wrapper)의 load 함수를 이용해 스마트계약 가져오기
    Caller: getInitalSupply, getTotalSupply
    Date: 2024.07.26
    Written by: 조현지
    */
    private DonateTokenBank loadContract() {
        TransactionManager transactionManager = new ClientTransactionManager(web3j, fromAccountAddress);
        return DonateTokenBank.load(
                contractAddress,
                web3j,
                transactionManager,
                new DefaultGasProvider()
        );
    }

    /*
    Function name: getInitialSupply
    Summary: DonateTokenBank의 initialSupply 가져오기
    Parameter: 없음
    Return: 총 1개, initialSupply 가져오기
    Date: 2024.07.26
    Written by: 조현지
    */
    public BigInteger getInitialSupply() {
        try {
            DonateTokenBank donateTokenBank = loadContract();
            return donateTokenBank._initialSupply().send();
        } catch (Exception e) {
            e.printStackTrace();
            return BigInteger.ZERO;
        }
    }

    /*
    Function name: getTotalSupply
    Summary: DonateTokenBank의 totalSupply 가져오기
    Parameter: 없음
    Return: 총 1개, totalSupply 가져오기
    Date: 2024.07.26
    Written by: 조현지
    */
    public BigInteger getTotalSupply() {
        try {
            DonateTokenBank donateTokenBank = loadContract();
            return donateTokenBank.totalSupply().send();
        } catch (Exception e) {
            e.printStackTrace();
            return BigInteger.ZERO;
        }
    }
}
