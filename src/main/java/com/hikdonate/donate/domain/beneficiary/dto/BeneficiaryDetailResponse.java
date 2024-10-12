package com.hikdonate.donate.domain.beneficiary.dto;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.hikdonate.donate.domain.tag.dto.tagResponse.TagItem;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/*
 * Class name: BeneficiaryDetailResponse
 * Summary: 수혜자 상세 페이지를 위한 정보 반환
 * Date: 2024.10.12
 * Write by: 심민서
 */
@Getter
@Setter
public class BeneficiaryDetailResponse {

    private Long beneficiaryId;
    private String beneficiaryName;
    private List<TagItem> beneficiaryTags;
    private String beneficiaryInfo;
    private String beneficiaryProfileImg;
    private String beneficiaryBackgroundImg;

    @JsonProperty("isInterested")
    private boolean isInterested;
}

