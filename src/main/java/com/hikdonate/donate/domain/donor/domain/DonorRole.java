package com.hikdonate.donate.domain.donor.domain;

import lombok.Getter;

/*
    Class name: DonorRole
    Summary: 기부자(Donor)의 역할(Role)을 정의하는 Enum 클래스.
             현재는 ROLE_ADMIN은 쓰지 않음
    Written by: 양예현
 */
@Getter
public enum DonorRole {
    ADMIN("ROLE_ADMIN"), USER("ROLE_USER");

    DonorRole(String value) {
        this.value = value;
    }

    private String value;
}
