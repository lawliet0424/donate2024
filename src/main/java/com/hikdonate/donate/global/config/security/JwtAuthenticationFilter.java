package com.hikdonate.donate.global.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hikdonate.donate.domain.donor.domain.DonorUserDetails;
import com.hikdonate.donate.domain.donor.dto.DonorLoginRequest;
import com.hikdonate.donate.domain.donor.dto.TokenResponse;
import com.hikdonate.donate.global.JwtToken.TokenProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOError;
import java.io.IOException;

@Slf4j
// 인증필터 구현 (UsernamePasswordAuthenticationFilter 상속)
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final TokenProvider tokenProvider;

    // 생성자
    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, TokenProvider tokenProvider) {
        super(authenticationManager);
        this.tokenProvider = tokenProvider;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            // 요청에서 로그인 정보 가져오기
            ObjectMapper om = new ObjectMapper();
            DonorLoginRequest loginParam = om.readValue(request.getInputStream(), DonorLoginRequest.class);

            //인증 토큰 생성
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(loginParam.id(), loginParam.password());

            // 인증
            return getAuthenticationManager().authenticate(authenticationToken);
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return null;
        }
    }

    // 인증 성공 시
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult
    ) throws IOException, ServletException {
        // 토큰 생성
        DonorUserDetails userDetails = (DonorUserDetails) authResult.getPrincipal();
        String jwt = tokenProvider.generateToken(userDetails);
        TokenResponse tokenResponse = new TokenResponse(jwt);

        //response body에 토큰 dto 반환
        ObjectMapper objectMapper = new ObjectMapper();
        String responseBody = objectMapper.writeValueAsString(tokenResponse);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(responseBody);
    }
}
