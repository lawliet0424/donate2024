package com.hikdonate.donate.domain.beneficiary.domain;

import com.hikdonate.donate.domain.interest.domain.Interest;
import com.hikdonate.donate.domain.organization.domain.Organization;
import com.hikdonate.donate.domain.tag.domain.TagLink;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

/*
 * Class name: Beneficiary
 * Summary: DB 테이블 설정을 위한 JPA entity class
 * Date: 2024.07.19
 * Write by: 양예현
 * P.S.: DB 관련 endpoint 설정 및 password과 같은 보안 설정은 계속 업데이트 예정
 *       ERD 및 DB에 대한 전체적인 내용은 노션 페이지 참고
 */
@Entity
@Getter
@Setter
public class Beneficiary {
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long beneficiary_id;

    @ManyToOne
    @JoinColumn(name = "organization_name", nullable = false)
    private Organization affiliation;

    @Column(nullable = false)
    private String beneficiary_name;

    @Column(nullable = false)
    private String beneficiary_nickname;

    @Column(nullable = false)
    private Integer beneficiary_age;

    @Column(nullable = false)
    private String beneficiary_gender;

    @Lob
    private String beneficiary_info;

    @Column(nullable = false)
    private String beneficiary_account;

    @Column(nullable = false)
    private String beneficiary_wallet;

    @OneToMany(mappedBy = "beneficiary", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Interest> likedByDonors = new HashSet<>();

    @OneToMany(mappedBy = "beneficiary", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<TagLink> tagLinks = new HashSet<>();

}
