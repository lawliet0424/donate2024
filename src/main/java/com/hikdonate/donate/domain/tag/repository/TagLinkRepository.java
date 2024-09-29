package com.hikdonate.donate.domain.tag.repository;

import com.hikdonate.donate.domain.beneficiary.domain.Beneficiary;
import com.hikdonate.donate.domain.tag.domain.TagLink;
import com.hikdonate.donate.domain.tag.domain.TagLinkId;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface TagLinkRepository extends JpaRepository<TagLink, TagLinkId>{
    List<TagLink> findByBeneficiary(@Param("beneficiary") Beneficiary beneficiary);

    // 여러 태그 ID에 해당하는 수혜자를 찾는 메소드
    @Query("SELECT DISTINCT tl.beneficiary FROM TagLink tl WHERE tl.tag.tagId IN :tagIds")
    List<Beneficiary> findBeneficiariesByTagIds(@Param("tagIds") List<Long> tagIds);

}