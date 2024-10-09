package com.hikdonate.donate.domain.beneficiary.dto;
import com.hikdonate.donate.domain.tag.domain.TagLink;
import com.hikdonate.donate.domain.tag.dto.tagResponse.TagItem;
import com.hikdonate.donate.domain.tag.dto.tagResponse.TagResponse;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
public class BeneficiaryDetailResponse {

    private Long beneficiaryId;
    private String beneficiaryName;
    private List<TagItem> beneficiaryTags;
    private String beneficiaryInfo;
//    private String beneficiaryProfileImg;
//    private String beneficiaryBackgroundImg;
    private boolean isInterested;
}

