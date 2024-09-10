package com.hikdonate.donate.domain.tag.domain;

import jakarta.persistence.Embeddable;

import java.util.Objects;

/*
 * Class name: TagLinkId
 * Summary: TagLinkId 테이블의 복합 키 속성 설정을 위한 클래스
 * Date: 2024.07.19
 * Write by: 양예현
 * P.S.: DB 관련 endpoint 설정 및 password과 같은 보안 설정은 계속 업데이트 예정
 *       ERD 및 DB에 대한 전체적인 내용은 노션 페이지 참고
 */
@Embeddable
public class TagLinkId {

    private Long beneficiary_id;
    private Long tag_id;

    public TagLinkId() {}

    public TagLinkId(Long beneficiary_id, Long tag_id) {
        this.beneficiary_id = beneficiary_id;
        this.tag_id = tag_id;
    }

    @Override
    public boolean equals(Object o) {
        if(this == o) return true;
        if(o == null || getClass() != o.getClass()) return false;
        TagLinkId that = (TagLinkId) o;
        return Objects.equals(beneficiary_id, that.beneficiary_id) && Objects.equals(tag_id, that.tag_id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(beneficiary_id, tag_id);
    }

}
