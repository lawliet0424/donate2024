package com.hikdonate.donate.domain.beneficiary.dto;

import com.hikdonate.donate.domain.beneficiary.domain.Beneficiary;
import com.hikdonate.donate.domain.tag.dto.tagResponse.TagItem;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


/*
 * Class name: BeneficiarySimpleResponse
 * Summary: 선정한 태그 해당자 리스트 응답을 위한 dto
 * Date: 2024.10.09
 * Write by: 심민서
 */
@Setter
@Getter
public class BeneficiarySimpleResponse {
    private Long beneficiaryId;
    private String beneficiaryName;
    private String beneficiaryProfileImg = "null";
    private List<TagItem> beneficiaryTags;
    private boolean isInterested;

    public BeneficiarySimpleResponse(Beneficiary beneficiary, List<TagItem> tags) {
        this.beneficiaryId = beneficiary.getBeneficiaryId();
        this.beneficiaryName = beneficiary.getBeneficiaryName();
        this.beneficiaryTags = tags;
    }

    public BeneficiarySimpleResponse() {
    }

}