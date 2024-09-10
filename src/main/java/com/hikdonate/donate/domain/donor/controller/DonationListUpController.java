package com.hikdonate.donate.domain.donor.controller;

import com.hikdonate.donate.domain.beneficiary.service.BeneficiaryInfoService;
import com.hikdonate.donate.domain.tag.repository.TagBasedSuggestionRequest;
import com.hikdonate.donate.domain.tag.repository.TaggedBeneficiaryContainer;
import com.hikdonate.donate.domain.tag.repository.tagResponse.TagResponse;
import com.hikdonate.donate.domain.tag.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/donation")
public class DonationListUpController {
    private final TagService tagService;
    private final BeneficiaryInfoService beneficiaryInfoService;

    // 태그 정보 반환
    @GetMapping("/step1")
    public TagResponse getAllTags() {
        return tagService.getAllTags();
    }

    // 수혜자 필터링 및 반환
    @PostMapping("/step3")
    public List<TaggedBeneficiaryContainer> getBeneficiariesByTags(@RequestBody TagBasedSuggestionRequest request) {
        // 수혜자 정보를 TaggedBeneficiaryContainer에 담아 반환
//        return beneficiaryInfoService.getBeneficiariesByTags(request);
        return null;
    }
}
