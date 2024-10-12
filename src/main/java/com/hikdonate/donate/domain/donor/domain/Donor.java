package com.hikdonate.donate.domain.donor.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hikdonate.donate.domain.interest.domain.Interest;
import jakarta.persistence.*;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

/*
 * Class name: Donor
 * Summary: DB 테이블 설정을 위한 JPA entity class
 * Date: 2024.10.12 (Updated by 심민서)
 * Write by: 양예현
 * P.S.: DB 관련 endpoint 설정 및 password과 같은 보안 설정은 계속 업데이트 예정
 *       ERD 및 DB에 대한 전체적인 내용은 노션 페이지 참고
 */

@Getter
@Setter
@Entity
public class Donor {

    @Id
    private String donorId;

    @Column(nullable = false)
    private String donorPassword;

    @Column(nullable = false)
    private String donorMail;

    private String donorName;

    @Column(nullable = false)
    private String donorNickname;

    private Integer donorAge;

    private String donorPhonenumber;

    private String donorAccount;

    //@Column(nullable = false)
    // 기본 값으로 ""가 되도록 임시 설정
    private String donorWallet = "";

    @OneToMany(mappedBy = "donor", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Interest> likedBeneficiaries = new HashSet<>();

}
