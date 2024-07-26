package com.hikdonate.donate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;

@SpringBootApplication
public class Donate2024Application {

	public static void main(String[] args) throws IOException {

		SpringApplication.run(Donate2024Application.class, args);

		EtherscanAPI etherscanAPI = new EtherscanAPI();
		Web3jWrapperGenerator web3jWrapperGenerator = new Web3jWrapperGenerator();

		String[][] contracts = {
				{"0xE47c8606fCbd06A51C3Ff44f5cdc6bE10eE65752", "DonateTokenBank"},
				{"0xD068C31619cc12342B7fD8b6fd42a8c9e1aE019e", "TokenTransfer"},
				{"0x32a321495bF737Ba46235542e2C5286D8445b3d2", "MultiTokenTransfer"}
		};

		String[] abiFiles = {
				"DonateTokenBank.json",
				"TokenTransfer.json",
				"MultiTokenTransfer.json"
		};

		for (String[] contract : contracts) {
			String contractAddress = contract[0];
			String contractName = contract[1];
			etherscanAPI.getContractABI(contractAddress, contractName);
		}

		for (String abiFile : abiFiles) {
			web3jWrapperGenerator.generateWrapper(abiFile);
		}
	}
}
