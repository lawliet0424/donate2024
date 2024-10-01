package com.hikdonate.donate.domain.tag.dto;

import com.hikdonate.donate.domain.beneficiary.domain.Beneficiary;
import com.hikdonate.donate.domain.tag.dto.tagResponse.TagItem;
import lombok.Getter;

import java.util.List;
import java.util.Optional;

@Getter
public class TaggedBeneficiaryContainer {
    private final Long beneficiaryId;
    private final String beneficiaryName;
    private final String beneficiaryProfileImg= "null";
    private final List<TagItem> beneficiaryTags;

    // 생성자
    public TaggedBeneficiaryContainer(Beneficiary beneficiary, List<TagItem> tags) {
        this.beneficiaryId = beneficiary.getBeneficiaryId();
        this.beneficiaryName = beneficiary.getBeneficiaryName();
        this.beneficiaryTags = tags;
    }
}