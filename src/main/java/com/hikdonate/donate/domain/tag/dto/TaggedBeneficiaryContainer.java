package com.hikdonate.donate.domain.tag.dto;

import com.hikdonate.donate.domain.beneficiary.domain.Beneficiary;
import com.hikdonate.donate.domain.tag.dto.tagResponse.TagItem;
import lombok.Getter;

import java.util.List;
import java.util.Optional;

@Getter
public class TaggedBeneficiaryContainer {
    // Getter 메서드들
    private final Beneficiary beneficiary;
    private final List<TagItem> tags;

    // 생성자
    public TaggedBeneficiaryContainer(Beneficiary beneficiary, List<TagItem> tags) {
        this.beneficiary = beneficiary;
        this.tags = tags;
    }

}