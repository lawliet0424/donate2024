package com.hikdonate.donate.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

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