package com.hikdonate.donate.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


/*
Class name: WebMvcConfig
Summary: 프론트엔드 도메인(http://localhost:5173)에서 오는 모든 요청에 대해 CORS 설정을 허용
Date: 2024.09.10
Written by: 심민서
 */
@Configuration
@EnableWebMvc
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173")  // 프론트엔드 도메인
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // 필요한 HTTP 메소드
                .allowedHeaders("*")  // 필요한 헤더
                .allowCredentials(true);  // 자격 증명 허용 (쿠키 등)
    }
}