package com.hikdonate.donate.domain.donor.service;
import org.springframework.beans.factory.annotation.Value;
import lombok.extern.slf4j.Slf4j;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

/*
 JWT 토큰 관련 기능을 제공하는 클래스
 */
@Slf4j
public class TokenProvider {
    private final DonorLoginService donorLoginService;
    private final Key jwtSecretKey;
    private final long jwtExpirationInMs;


    public TokenProvider(DonorLoginService donorLoginService,
                         @Value("${jwt.secret}") String secretKey,
                         @Value("${jwt.expiration}") long jwtExpirationInMs) {
        this.donorLoginService = donorLoginService;
        this.jwtSecretKey = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        this.jwtExpirationInMs = jwtExpirationInMs;
    }

    // 토큰 생성
    public String generateToken(UserDetails userDetails) {
        long now = (new Date()).getTime();
        // 접근 토큰 생성
    }

}
