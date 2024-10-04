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
 * Date: 2024.09.30
 * Write by: 양예현 (Updated by 심민서)
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
    @Column(name = "beneficiary_id")
    private Long beneficiaryId;

    @ManyToOne
    @JoinColumn(name = "organization_name", nullable = false)
    private Organization affiliation;

    @Column(name = "beneficiary_name", nullable = false)
    private String beneficiaryName;

    @Column(name = "beneficiary_nickname", nullable = false)
    private String beneficiaryNickname;

    @Column(name = "beneficiary_age", nullable = false)
    private Integer beneficiaryAge;

    @Column(name = "beneficiary_gender", nullable = false)
    private String beneficiaryGender;

    @Lob
    @Column(name = "beneficiary_info")
    private String beneficiaryInfo;

    @Column(name = "beneficiary_account", nullable = false)
    private String beneficiaryAccount;

    @Column(name = "beneficiary_wallet", nullable = false)
    private String beneficiaryWallet;

    @OneToMany(mappedBy = "beneficiary", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Interest> likedByDonors = new HashSet<>();

    @OneToMany(mappedBy = "beneficiary", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<TagLink> tagLinks = new HashSet<>();

}
