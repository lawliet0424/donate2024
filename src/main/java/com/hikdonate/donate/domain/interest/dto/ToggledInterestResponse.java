package com.hikdonate.donate.domain.interest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

/*
    Class name: ToggledInterestResponse
    Summary: 해당 수혜자의 관심 여부를 바꾼 뒤 응답 dto
    Written by: 심민서
*/
@Setter
@Getter
public class ToggledInterestResponse {
    private Long beneficiaryId;

    @JsonProperty("isInterested")
    private boolean isInterested;
}
