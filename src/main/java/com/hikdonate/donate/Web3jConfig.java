package com.hikdonate.donate;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;

/*
Class name: Web3jConfig
Summary: Sepolia testnet의 스마트계약을 가져오기 위한, Infura 네트워크와의 초기 연결 설정
         (application.properties에 등록해둔 개인 infura API를 통해 연결됨)
Date: 2024.07.26
Written by: 조현지
 */
@Configuration
public class Web3jConfig {
    @Value("${infura.url}")
    private String infuraURL;

    @Bean
    public Web3j web3j() {
        return Web3j.build(new HttpService(infuraURL));
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
