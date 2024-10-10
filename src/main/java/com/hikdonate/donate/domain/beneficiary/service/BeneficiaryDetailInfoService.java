package com.hikdonate.donate.domain.beneficiary.service;


import com.hikdonate.donate.domain.beneficiary.domain.Beneficiary;
import com.hikdonate.donate.domain.beneficiary.dto.BeneficiaryDetailResponse;
import com.hikdonate.donate.domain.beneficiary.repository.BeneficiaryRepository;
import com.hikdonate.donate.domain.donor.repository.DonorRepository;
import com.hikdonate.donate.domain.donor.service.DonorDetailsService;
import com.hikdonate.donate.domain.interest.domain.Interest;
import com.hikdonate.donate.domain.tag.domain.TagLink;
import com.hikdonate.donate.domain.tag.dto.tagResponse.TagItem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BeneficiaryDetailInfoService {
    private final BeneficiaryRepository beneficiaryRepository;
    private final DonorDetailsService donorDetailsService;
    private final ConvertService convertService;

    /*
     Function name: getBeneficiaryDetailById
     Summary: 수혜자 상세정보를 DTO로 변환
     Parameter: 1개
         Long beneficiaryId
     Return: BeneficiaryDetailResponse
     Caller: BeneficiaryDetailController
     Date: 2024.10.09
     Written by: 심민서
     */
    public BeneficiaryDetailResponse getBeneficiaryDetailById(Long beneficiary_id) {
        Beneficiary beneficiary = beneficiaryRepository.findByBeneficiaryId(beneficiary_id);
        String current_donor_id = donorDetailsService.getCurrentDonorId();

        BeneficiaryDetailResponse beneficiary_info = new BeneficiaryDetailResponse();
        beneficiary_info.setBeneficiaryId(beneficiary_id);
        beneficiary_info.setBeneficiaryName(beneficiary.getBeneficiaryName());
        beneficiary_info.setBeneficiaryTags(convertService.convertToTagItemList(beneficiary));
        beneficiary_info.setBeneficiaryInfo(beneficiary.getBeneficiaryInfo());
        beneficiary_info.setInterested(convertService.convertToIsInterested(beneficiary, current_donor_id));

        return beneficiary_info;
    }
}
