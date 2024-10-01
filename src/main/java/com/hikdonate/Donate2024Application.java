package com.hikdonate;

import com.hikdonate.donate.web3j.EtherscanAPI;
import com.hikdonate.donate.web3j.Web3jWrapperGenerator;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

import java.io.IOException;

/*
Class name: Donate2024Application
Summary: 서버를 띄우고, 스마트 컨트랙트를 infura를 통해 가져오기
Date: 2024.07.26
Written by: 조현지
*/

@RequiredArgsConstructor
@SpringBootApplication
@ComponentScan(basePackages = {"com.hikdonate.donate"})
public class Donate2024Application {
   /*
    Function name: main
    Summary: Sepolia testnet 상의 스마트계약을 가져온 뒤, service와 controller에 필요한 json파일과 java wrapper 파일 생성하기
    Parameter: 없음
    Return: 없음
    Date: 2024.07.26
    Written by: 조현지
    */

	@Value("${donateManagement.address}")
	private String contractAddress;

	private final EtherscanAPI etherscanAPI;
	private final Web3jWrapperGenerator web3jWrapperGenerator;

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
//	@PostConstruct
//	public void init() throws IOException {
//		// 초기화 작업 수행
//		System.out.println("Application has been initialized");
//
//		// 가져와야하는 스마트 컨트랙트 주소와 주소와 대응되는 json 파일명 지정
//		String abiFile = "DonateManagement.json";
//
//		// Sepolia testnet에 verified된 스마트 컨트랙트를 순서대로 가져와서 로컬에 저장하기
//		etherscanAPI.getContractABI(contractAddress, "DonateManagement");
//
//		// 로컬에 저장할 json 파일을 토대로 java wrapper 파일을 로컬에 생성하기
//		web3jWrapperGenerator.generateWrapper(abiFile);
//	}
}