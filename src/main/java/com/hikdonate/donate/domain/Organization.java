package com.hikdonate.donate.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

/*
 * Class name: Organization
 * Summary: DB 테이블 설정을 위한 JPA entity class
 * Date: 2024.07.19
 * Write by: 양예현
 * P.S.: DB 관련 endpoint 설정 및 password과 같은 보안 설정은 계속 업데이트 예정
 *       ERD 및 DB에 대한 전체적인 내용은 노션 페이지 참고
 */
@Getter
@Setter
@Entity
public class Organization {
    @Id
    private String organization_name;
}
