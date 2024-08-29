package com.hikdonate.donate.config;


import com.hikdonate.donate.web3jAPI.contracts.DonateTokenBank;
import com.hikdonate.donate.web3jAPI.contracts.MultiTokenTransfer;
import com.hikdonate.donate.web3jAPI.contracts.TokenTransfer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.DefaultGasProvider;

/*
Class name: Web3jConfig
Summary: Sepolia testnet의 스마트계약을 가져오기 위한, Infura 네트워크와의 초기 연결 설정
         (application.properties에 등록해둔 개인 infura API를 통해 연결됨)
Date: 2024.07.26
Written by: 조현지
 */
@Configuration
public class Web3jConfig {
    // AutoWired로 바로 접근 가능
    @Value("${infura.url}")
    private String infuraURL;

    @Value("${apikey}")
    private String adminPrivateKey;

    @Value("${donateTokenBank.address}")
    private String donateTokenBankAddress;

    @Value("${tokenTransfer.address}")
    private String tokenTransferAddress;

    @Value("${multiTokenTransfer.address}")
    private String multiTokenTransferAddress;

    @Bean
    public Web3j web3j() {
        return Web3j.build(new HttpService(infuraURL));
    }

    @Bean
    public Credentials credentials() {
        return Credentials.create(adminPrivateKey);
    }

    @Bean
    public DonateTokenBank donateTokenBank(Web3j web3j, Credentials credentials) {
        return DonateTokenBank.load(donateTokenBankAddress, web3j, credentials, new DefaultGasProvider());
    }

    @Bean
    public TokenTransfer tokenTransfer(Web3j web3j, Credentials credentials) {
        return TokenTransfer.load(tokenTransferAddress, web3j, credentials, new DefaultGasProvider());
    }

    @Bean
    public MultiTokenTransfer multiTokenTransfer(Web3j web3j, Credentials credentials) {
        return MultiTokenTransfer.load(multiTokenTransferAddress, web3j, credentials, new DefaultGasProvider());
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("http://localhost:8080");
            }
        };
    }
}