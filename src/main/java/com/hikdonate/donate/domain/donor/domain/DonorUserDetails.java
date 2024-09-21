package com.hikdonate.donate.domain.donor.domain;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

/*
    Class name: DonorUserDetails
    Summary: Spring Security에서 사용자의 인증 정보를 담기 위한 UserDetails 구현체.
             Donor 객체를 기반으로 인증과 권한 관련 정보를 제공함
    Written by: 양예현
*/
public class DonorUserDetails implements UserDetails {
    private final Donor donor;

    public DonorUserDetails(Donor donor) {
        this.donor = donor;
    }

    // 해당 사용자의 권한 목록을 반환. 여기서는 기본적으로 "ROLE_USER" 권한을 부여함.
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"));
    }

    // Donor 객체에서 사용자의 비밀번호를 반환.
    @Override
    public String getPassword() {
        return donor.getDonorPassword();
    }

    // Donor 객체에서 사용자의 ID(사용자 이름)를 반환.
    @Override
    public String getUsername() {
        return donor.getDonorId();
    }

}
