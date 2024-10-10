package com.hikdonate.donate.domain.interest.service;

import com.hikdonate.donate.domain.beneficiary.domain.Beneficiary;
import com.hikdonate.donate.domain.beneficiary.dto.BeneficiarySimpleResponse;
import com.hikdonate.donate.domain.beneficiary.service.ConvertService;
import com.hikdonate.donate.domain.donor.domain.Donor;
import com.hikdonate.donate.domain.donor.service.DonorDetailsService;
import com.hikdonate.donate.domain.interest.domain.Interest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class InterestedBeneficiariesService {
    private final DonorDetailsService donorDetailsService;
    private final ConvertService convertService;

    /*
    Function name: getInterestedBeneficiaries
    Summary: 현재 기부자의 관심 수혜자 목록 반환 서비스
    Parameter: 없음
    Return: List<BeneficiarySimpleResponse>
    Caller: DonorController
    Date: 2024.10.09
    Written by: 심민서
    */
    public List<BeneficiarySimpleResponse> getInterestedBeneficiaries() {
        Donor current_donor = donorDetailsService.getDonorInfo();
        Set<Interest> interest_list = current_donor.getLikedBeneficiaries();
        List<BeneficiarySimpleResponse> beneficiaries_info = new java.util.ArrayList<>(List.of());
        BeneficiarySimpleResponse beneficiary_info = new BeneficiarySimpleResponse();

        for (Interest i : interest_list){
            Beneficiary beneficiary = i.getBeneficiary();

            beneficiary_info.setBeneficiaryId(beneficiary.getBeneficiaryId());
            beneficiary_info.setBeneficiaryName(beneficiary.getBeneficiaryName());
            beneficiary_info.setBeneficiaryTags(convertService.convertToTagItemList(beneficiary));
            beneficiary_info.setInterested(true);
            beneficiaries_info.add(beneficiary_info);
        }

        return beneficiaries_info;
    }

}
