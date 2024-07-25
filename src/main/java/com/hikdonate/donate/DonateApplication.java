package com.hikdonate.donate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.Web3ClientVersion;
import org.web3j.protocol.http.HttpService;

@SpringBootApplication
public class DonateApplication {

	public static void main(String[] args) {
		SpringApplication.run(DonateApplication.class, args);
	}
}
