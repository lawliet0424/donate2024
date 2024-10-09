package com.hikdonate.donate.domain.beneficiary.controller;

import com.hikdonate.donate.domain.beneficiary.dto.BeneficiaryDetailResponse;
import com.hikdonate.donate.domain.beneficiary.service.BeneficiaryDetailInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

/*
Class name: BeneficiaryDetailController
Summary: 수혜자 상세 데이터 반환 담당 컨트롤러
Date: 2024.10.07
Written by: 심민서
 */
@RestController
public class BeneficiaryDetailController {

    @Autowired
    private BeneficiaryDetailInfoService beneficiaryDetailInfoService;
    /*
    Function name: getBeneficiaryDetailInfo
    Summary:
    Parameter: 1개
        Long beneficiaryId
    Return:
    Caller: 없음
    Date: 2024.10.09
    Written by:
    */
    @GetMapping("/beneficiary/{beneficiaryId}")
    public BeneficiaryDetailResponse getBeneficiaryDetailInfo(@PathVariable Long beneficiaryId) {
        BeneficiaryDetailResponse detail = beneficiaryDetailInfoService.getBeneficiaryDetailById(beneficiaryId);

        System.out.println(detail);
        if (detail == null) {
            // BeneficiaryDetailForm이 null일 경우 예외 발생
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Beneficiary not found");
        }

        return detail;
    }
}
