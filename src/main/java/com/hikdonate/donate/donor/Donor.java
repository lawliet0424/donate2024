package com.hikdonate.donate.donor;

import jakarta.persistence.*;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.HashSet;
import java.util.Set;

/*
* Class name: Donor
* Summary: DB 테이블 설정을 위한 JPA entity class
* Date: 2024.07.19
* Write by: 양예현
 * P.S.: DB 관련 endpoint 설정 및 password과 같은 보안 설정은 계속 업데이트 예정
 *       ERD 및 DB에 대한 전체적인 내용은 노션 페이지 참고
 */
@Entity
public class Donor {

    @Id
    private Long donor_id;

    /* password는 spring security를 이용하여 재구성할 예정 */
    @Column(nullable = false)
    private String donor_password;

    @Column(nullable = false)
    private String donor_mail;

    private String donor_name;

    @Column(nullable = false)
    private String donor_nickname;

    private Integer donor_age;

    private String donor_phonenumber;

    private String donor_account;

    @Column(nullable = false)
    private String donor_wallet;

    @OneToMany(mappedBy = "donor", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Interest> likedBeneficiaries = new HashSet<>();

}
