package com.hikdonate.donate.domain.tag.repository;

import java.util.List;

public class TagBasedSuggestionRequest {
    private List<Long> tagIds; // 사용자가 선택한 태그의 ID 리스트
    private int numberOfBeneficiaries; // 요청된 수혜자 인원수

    // 기본 생성자
    public TagBasedSuggestionRequest() {}

    // 파라미터를 사용하는 생성자
    public TagBasedSuggestionRequest(List<Long> tagIds, int numberOfBeneficiaries) {
        this.tagIds = tagIds;
        this.numberOfBeneficiaries = numberOfBeneficiaries;
    }

    // Getter/Setter 메서드들
    public List<Long> getTagIds() {
        return tagIds;
    }

    public void setTagIds(List<Long> tagIds) {
        this.tagIds = tagIds;
    }

    public int getNumberOfBeneficiaries() {
        return numberOfBeneficiaries;
    }

    public void setNumberOfBeneficiaries(int numberOfBeneficiaries) {
        this.numberOfBeneficiaries = numberOfBeneficiaries;
    }
}
