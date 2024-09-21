package com.hikdonate.donate.domain.donor.dto;

/*
        Interface name: DonorSignUpValidationGroups
        Summary: 기부자 회원가입 시 여러 단계의 유효성 검사를 그룹화하기 위한 인터페이스.
             각 회원가입 단계에서 다른 유효성 검사를 적용할 수 있도록 그룹을 정의함.
        Nested interfaces:
                SignUpStep1; 첫 번째 페이지에서 검사하는 데이터 - donorName, donorMail, donorPhoneNumber
                SignUpStep2; 두 번째 페이지에서 검사하는 데이터 - donorNickname, donorId, donorPassword
 */
public interface DonorSignUpValidationGroups {
    interface SignUpStep1 {}
    interface SignUpStep2 {}

}
