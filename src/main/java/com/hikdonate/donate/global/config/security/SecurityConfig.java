package com.hikdonate.donate.global.config.security;

import com.hikdonate.donate.global.JwtToken.TokenProvider;
import org.hibernate.grammars.hql.HqlParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

/*
Class name: SecurityConfig
Summary: Spring security가 csrf 처리 시 h2 콘솔은 예외로 처리할 수 있도록 하기 위한 설정 클래스
Date: 2024.07.15
Written by: 양예현
P.S.: h2(데이터베이스) 접속을 위해 필요한 클래스로, 클래스 위치와 내용은 변경될 수 있음

 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private TokenProvider tokenProvider;

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http, AuthenticationManager authenticationManager) throws Exception {
//        http
//                .authorizeHttpRequests((authorizeHttpRequests)
//                        -> authorizeHttpRequests.requestMatchers(new AntPathRequestMatcher("/**")).permitAll())
//                .csrf((csrf) -> csrf
//                        .ignoringRequestMatchers(new AntPathRequestMatcher("/h2-console/**"), new AntPathRequestMatcher("/donor/login")))
//                .headers((headers) -> headers.addHeaderWriter(new XFrameOptionsHeaderWriter(XFrameOptionsHeaderWriter.XFrameOptionsMode.SAMEORIGIN)))
//                .formLogin((formLogin) -> formLogin
//                        .loginPage("/donor/login")
//                        .defaultSuccessUrl("/"))
//                .logout((logout) -> logout.logoutRequestMatcher(new AntPathRequestMatcher("/donor/logout")).logoutSuccessUrl("/").invalidateHttpSession(true))
//        ;

        http
                // jwt 토큰 사용
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.disable())
                .formLogin(formLogin -> formLogin.disable())
                .httpBasic(httpBasic -> httpBasic.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // 요청 처리
                .authorizeHttpRequests(authorize -> authorize
                        // 회원가입 경로
                        .requestMatchers("/api/donor/signup").permitAll()
                                .anyRequest().authenticated()
                        );

        // 커스텀 필터 추가
        JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, tokenProvider);
        jwtAuthenticationFilter.setFilterProcessesUrl("/api/donor/login");

        JwtAuthorizationFilter jwtAuthorizationFilter = new JwtAuthorizationFilter(authenticationManager, tokenProvider);

        // 필터 체인에 추가
//        http.addFilter(jwtAuthenticationFilter)
//                .addFilter(jwtAuthorizationFilter);
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class);


        return http.build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 로그인 정보 (이름, 비밀번호)로 Authentication 객체를 만들어
    // AuthenticationProvider에 전달하여 인증을 수행하고, 인증 결과 반환
    // loadUserByUsername을 통해 DB에서 회원정보와 일치할 때만 인증 처리
    // Bean 생성 시 스프링 내부 동작으로 UserSecurityService와 PasswordEncoder가 자동으로 설정
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }





}