package com.hikdonate.donate.domain.tag.domain;

import com.hikdonate.donate.domain.beneficiary.domain.Beneficiary;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

/*
 * Class name: TagLink
 * Summary: DB 테이블 설정을 위한 JPA entity class
 * Date: 2024.07.19
 * Write by: 양예현
 * P.S.: DB 관련 endpoint 설정 및 password과 같은 보안 설정은 계속 업데이트 예정
 *       ERD 및 DB에 대한 전체적인 내용은 노션 페이지 참고
 */
@Entity
@Getter
@Setter
public class TagLink implements Serializable {

    @EmbeddedId
    @Column(name = "taglink_id")
    private TagLinkId taglinkId;

    @ManyToOne
    @MapsId("beneficiaryId")
    @JoinColumn(name = "beneficiary_id")
    private Beneficiary beneficiary;

    @ManyToOne
    @MapsId("tagId")
    @JoinColumn(name = "tag_id")
    private Tag tag;

    @Column(name = "beneficiary_nickname")
    private String beneficiaryNickname;

    @Column(name = "tag_name")
    private String tagName;

    @Column(name = "tag_classification")
    private String tagClassification;

    public TagLink() {}

    public TagLink(Beneficiary beneficiary, Tag tag, String beneficiary_nickname, String tag_name, String tag_classification) {
        this.taglinkId = new TagLinkId(beneficiary.getBeneficiaryId(), tag.getTagId());
        this.beneficiary = beneficiary;
        this.tag = tag;
        this.beneficiaryNickname = beneficiary_nickname;
        this.tagName = tag_name;
        this.tagClassification = tag_classification;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TagLink tagLink = (TagLink) o;
        return Objects.equals(taglinkId, tagLink.taglinkId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(taglinkId);
    }
}
