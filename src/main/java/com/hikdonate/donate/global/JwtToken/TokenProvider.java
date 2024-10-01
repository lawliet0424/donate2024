package com.hikdonate.donate.global.JwtToken;
import com.hikdonate.donate.domain.donor.domain.DonorUserDetails;
import com.hikdonate.donate.domain.donor.service.DonorLoginService;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import lombok.extern.slf4j.Slf4j;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

/*
 JWT 토큰 관련 기능을 제공하는 클래스
 */
@Component
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
        Date accessTokenExpiresIn = new Date(now + jwtExpirationInMs);
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("auth", userDetails.getAuthorities())
                .setExpiration(accessTokenExpiresIn)
                .signWith(jwtSecretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    // 인증 정보 추출
    public Authentication extractAuthentication(String accessToken) {
        // 토큰 복호화
        Claims claims = parseClaims(accessToken);

        if(claims.get("auth") == null) {
            throw new IllegalArgumentException("권한 정보가 없는 토큰입니다.");
        }

        // 회원 이름 추출
        String name = getUsernameFromToken(accessToken);

        // UserDetails 객체를 만들어서 Authentication 리턴
        DonorUserDetails donorUserDetails = donorLoginService.loadUserByUsername(name);
        return new UsernamePasswordAuthenticationToken(donorUserDetails, null, donorUserDetails.getAuthorities());
    }

    // 토큰 복호화
    private Claims parseClaims(String accessToken) {
        try {
            return Jwts.parserBuilder().setSigningKey(jwtSecretKey).build().parseClaimsJws(accessToken).getBody();
            // 토큰 만료시 예외 처리
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    // 토큰에서 사용자 이름 추출
    public String getUsernameFromToken(String token) {
        Claims claims = parseClaims(token);
        return claims.getSubject(); // claim의 subject(사용자 ID) get하기
    }

    // 토큰 검증
    public boolean validateToken(String token) throws JwtException {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(jwtSecretKey)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            throw new JwtException("유효하지 않은 토큰입니다.");
        }
    }



}
