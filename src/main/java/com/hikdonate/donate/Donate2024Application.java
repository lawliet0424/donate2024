package com.hikdonate.donate;

import com.hikdonate.donate.web3jAPI.EtherscanAPI;
import com.hikdonate.donate.web3jAPI.Web3jWrapperGenerator;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;

/*
Class name: Donate2024Application
Summary: 서버를 띄우고, 스마트 컨트랙트를 infura를 통해 가져오기
Date: 2024.07.26
Written by: 조현지
*/
@SpringBootApplication
@Slf4j
public class Donate2024Application {
	/*
    Function name: main
    Summary: Sepolia testnet 상의 스마트계약을 가져온 뒤, service와 controller에 필요한 json파일과 java wrapper 파일 생성하기
    Parameter: 없음
    Return: 없음
    Date: 2024.07.26
    Written by: 조현지
    */
	public static void main(String[] args) throws IOException {
		// 서버 띄우기
		SpringApplication.run(Donate2024Application.class, args);
	}

	/*
    Function name: init
    Summary: 서버 초기화 작업
    Parameter: 없음
    Return: 없음
    Date: 2024.08.10
    Written by: 조현지
    */
	@PostConstruct
	public void init() throws IOException {
		// 초기화 작업 수행
		System.out.println("Application has been initialized");

		// 스마트 컨트랙트를 가져오기 위해 EtherscanAPI(Sepolia testnet ABI data -> json 저장)과 Web3jWrapperGenerator(json -> java wrapper 저장) 객체 만들기
		EtherscanAPI etherscanAPI = new EtherscanAPI();
		Web3jWrapperGenerator web3jWrapperGenerator = new Web3jWrapperGenerator();

		// 가져와야하는 스마트 컨트랙트 주소와 주소와 대응되는 json 파일명 지정
		String[][] contracts = {
				{"0xE47c8606fCbd06A51C3Ff44f5cdc6bE10eE65752", "DonateTokenBank"},
				{"0xD068C31619cc12342B7fD8b6fd42a8c9e1aE019e", "TokenTransfer"},
				{"0x32a321495bF737Ba46235542e2C5286D8445b3d2", "MultiTokenTransfer"}
		};

		// java wrapper로 변환할 json 파일명 지정
		String[] abiFiles = {
				"DonateTokenBank.json",
				"TokenTransfer.json",
				"MultiTokenTransfer.json"
		};

		// Sepolia testnet에 verified된 스마트 컨트랙트를 순서대로 가져와서 로컬에 저장하기
		for (String[] contract : contracts) {
			String contractAddress = contract[0];
			String contractName = contract[1];
			etherscanAPI.getContractABI(contractAddress, contractName);
		}

		// 로컬에 저장할 json 파일을 토대로 java wrapper 파일을 로컬에 생성하기
		for (String abiFile : abiFiles) {
			web3jWrapperGenerator.generateWrapper(abiFile);
		}
	}
}