package com.hikdonate.donate.domain.donor.dto;

// 로그인 정보를 담아올 dto
public record DonorLoginRequest(String id, String password) {
    public DonorLoginRequest {

    }
}
