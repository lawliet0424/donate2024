package com.hikdonate.donate.domain.tag.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.util.Objects;

/*
 * Class name: TagLinkId
 * Summary: TagLinkId 테이블의 복합 키 속성 설정을 위한 클래스
 * Date: 2024.09.30
 * Write by: 양예현 (Updated by 심민서)
 * P.S.: DB 관련 endpoint 설정 및 password과 같은 보안 설정은 계속 업데이트 예정
 *       ERD 및 DB에 대한 전체적인 내용은 노션 페이지 참고
 */
@Embeddable
public class TagLinkId {

    @Column(name = "beneficiary_id")
    private Long beneficiaryId;

    @Column(name = "tag_id")
    private Long tagId;

    public TagLinkId() {}

    public TagLinkId(Long beneficiary_id, Long tag_id) {
        this.beneficiaryId = beneficiary_id;
        this.tagId = tag_id;
    }

    @Override
    public boolean equals(Object o) {
        if(this == o) return true;
        if(o == null || getClass() != o.getClass()) return false;
        TagLinkId that = (TagLinkId) o;
        return Objects.equals(beneficiaryId, that.beneficiaryId) && Objects.equals(tagId, that.tagId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(beneficiaryId, tagId);
    }

}
