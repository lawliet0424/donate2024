package com.hikdonate;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

import java.io.IOException;

/*
Class name: Donate2024Application
Summary: 서버를 띄우고, 스마트 컨트랙트를 infura를 통해 가져오기
Date: 2024.07.26
Written by: 조현지
*/

@RequiredArgsConstructor
@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
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

}