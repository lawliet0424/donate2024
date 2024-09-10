package com.hikdonate.donate.domain.tag.repository;

import com.hikdonate.donate.domain.beneficiary.domain.Beneficiary;
import com.hikdonate.donate.domain.tag.repository.tagResponse.TagResponse;

import java.util.List;

public class TaggedBeneficiaryContainer {
    private Beneficiary beneficiary;
    private List<TagResponse> tags;

    // 생성자
    public TaggedBeneficiaryContainer(Beneficiary beneficiary, List<TagResponse> tags) {
        this.beneficiary = beneficiary;
        this.tags = tags;
    }

    // Getter 메서드들
    public Beneficiary getBeneficiary() {
        return beneficiary;
    }

    public List<TagResponse> getTags() {
        return tags;
    }
}
