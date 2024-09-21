package com.hikdonate.donate.domain.tag.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

/*
 * Class name: Tag
 * Summary: DB 테이블 설정을 위한 JPA entity class
 * Date: 2024.07.19
 * Write by: 양예현
 * P.S.: DB 관련 endpoint 설정 및 password과 같은 보안 설정은 계속 업데이트 예정
 *       ERD 및 DB에 대한 전체적인 내용은 노션 페이지 참고
 */
@Entity
@Getter
@Setter
public class Tag {
    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagId;


    @Getter
    @Setter
    @Column(nullable = false)
    private String tagName;

    @Getter
    @Setter
    private String tagClassification;

    @OneToMany(mappedBy = "tag", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<TagLink> tagLinks = new HashSet<>();

}
