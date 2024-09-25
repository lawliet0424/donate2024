package com.hikdonate.donate.domain.donor.controller;

import com.hikdonate.donate.domain.beneficiary.service.BeneficiaryInfoService;
import com.hikdonate.donate.domain.tag.dto.TagBasedSuggestionRequest;
import com.hikdonate.donate.domain.tag.dto.TaggedBeneficiaryContainer;
import com.hikdonate.donate.domain.tag.dto.tagResponse.TagInfo;
import com.hikdonate.donate.domain.tag.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
Class name: DonationListUpController
Summary: 기부하기의 step1 ~ step3 담당 컨트롤러
Date: 2024.09.10
Written by: 심민서
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/donation")
public class DonationListUpController {
    private final TagService tagService;
    private final BeneficiaryInfoService beneficiaryInfoService;


    /*
    Function name: getAllTags
    Summary: 태그 정보 반환
    Parameter: 없음
    Return: 총 1개
    Caller: 없음
    Date: 2024.9.10
    Write by: 심민서
    */
    @GetMapping("/step1")
    public List<TagInfo> getAllTags() {
        return tagService.getAllTags();
    }


    /*
    Function name: getBeneficiariesByTags
    Summary: 수혜자 필터링 및 반환
    Parameter: 총 1개
    Return: 총 1개
        Caller: 없음
    Date: 2024.9.10
    Write by: 심민서
*/
    @PostMapping("/step3")
    public List<TaggedBeneficiaryContainer> getBeneficiariesByTags(@RequestBody TagBasedSuggestionRequest request) {
        // 수혜자 정보를 TaggedBeneficiaryContainer에 담아 반환
        return beneficiaryInfoService.getBeneficiariesByTags(request);
    }
}
