package com.hikdonate.donate.domain.donor.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

/*
    Class name: DonorLoginForm
    Summary: 기부자(Donor)의 회원가입 폼 데이터를 담는 클래스.
             사용자가 회원가입 시 입력하는 데이터(name, mail, phonenumber, nickname, Id, password)를 저장하고 유효성 검사를 함
    Written by: 양예현
*/
@Slf4j
@Getter
@Setter
public class DonorSignUpForm {

    @NotEmpty(message = "이름은 필수항목입니다.", groups = DonorSignUpValidationGroups.SignUpStep1.class)
    private String signupName;

    @NotEmpty(message = "이메일은 필수항목입니다.", groups = DonorSignUpValidationGroups.SignUpStep1.class)
    @Email
    private String signupEmail;

    @NotEmpty(message = "전화번호는 필수항목입니다.", groups = DonorSignUpValidationGroups.SignUpStep1.class)
    private String signupPhoneNumber;

    @NotEmpty(message = "닉네임은 필수항목입니다.", groups = DonorSignUpValidationGroups.SignUpStep2.class)
    private String signupNickname;

    @NotEmpty(message = "id은 필수항목입니다.", groups = DonorSignUpValidationGroups.SignUpStep2.class)
    private String signupId;

    @NotEmpty(message = "비밀번호는 필수항목입니다.", groups = DonorSignUpValidationGroups.SignUpStep2.class)
    private String signupPassword;

}
