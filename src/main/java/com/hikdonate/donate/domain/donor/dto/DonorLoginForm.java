package com.hikdonate.donate.domain.donor.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

/*
    Class name: DonorLoginForm
    Summary: 기부자(Donor)의 로그인 폼 데이터를 담는 클래스.
             사용자가 로그인 시 입력하는 ID와 비밀번호를 저장하며, 유효성 검사를 포함함.
    Written by: 양예현
*/
@Getter
@Setter
public class DonorLoginForm {
    
    @NotEmpty(message = "id를 입력해주세요")
    private String donorLoginId;
    
    @NotEmpty(message = "pw를 입력해주세요")
    private String donorLoginPassword;
}
