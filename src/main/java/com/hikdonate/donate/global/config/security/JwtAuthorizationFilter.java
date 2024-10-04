package com.hikdonate.donate.global.config.security;

import com.hikdonate.donate.global.JwtToken.TokenProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import java.io.IOException;

@Slf4j
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private final static String HEADER_STRING = "Authorization";
    private final static String TOKEN_PREFIX = "Bearer ";

    private final TokenProvider tokenProvider;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, TokenProvider tokenProvider) {
        super(authenticationManager);
        this.tokenProvider = tokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        // 로그인 경로는 JWT 검증을 하지 않음
        String requestURI = request.getRequestURI();
        if(requestURI.equals("/api/donor/login") || requestURI.equals("/api/donor/signup")) {
            chain.doFilter(request, response);
            return;
        }

        // 헤더에 원하는 정보가 있는지 확인
        String header = request.getHeader(HEADER_STRING);
        if(header == null || !header.startsWith(TOKEN_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }

        // 헤더에서 토큰 정보 추출
        String token = request.getHeader(HEADER_STRING).replace(TOKEN_PREFIX, "");

        // 토큰 검증
//        tokenProvider.validateToken(token);
        try {
            tokenProvider.validateToken(token);
        } catch (Exception e) {
            log.error("Invalid JWT Token", e);
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT Token");
            return;
        }

        // 토큰으로부터 인증 정보 추출
        Authentication authentication = tokenProvider.extractAuthentication(token);
        // 강제로 시큐리티의 세션에 접근하여 값 저장
        SecurityContextHolder.getContext().setAuthentication(authentication);

        chain.doFilter(request, response);
    }
}
