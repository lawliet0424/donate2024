package com.hikdonate.donate.domain.interest.service;

import com.hikdonate.donate.domain.beneficiary.repository.BeneficiaryRepository;
import com.hikdonate.donate.domain.donor.repository.DonorRepository;
import com.hikdonate.donate.domain.donor.service.DonorDetailsService;
import com.hikdonate.donate.domain.interest.domain.Interest;
import com.hikdonate.donate.domain.interest.domain.InterestId;
import com.hikdonate.donate.domain.interest.dto.ToggledInterestResponse;
import com.hikdonate.donate.domain.interest.repository.InterestRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class ToggleInterestService {
    private final InterestRepository interestRepository;
    private final BeneficiaryRepository beneficiaryRepository;
    private final DonorDetailsService donorDetailsService;
    /*
 Function name: getInterestedBeneficiaries
 Summary: 현재 기부자의 관심 수혜자 목록 반환 서비스
 Parameter: 없음
 Return: List<ToggledInterestResponse>
 Caller: ToggleInterestController
 Date: 2024.10.09
 Written by: 심민서
 */
    public ToggledInterestResponse toggleInterest(String donor_id, Long beneficiary_id) {
        ToggledInterestResponse toggled_info = new ToggledInterestResponse();
        toggled_info.setBeneficiaryId(beneficiary_id);
        InterestId interest_id = new InterestId(donor_id, beneficiary_id);
        Optional<Interest> interest = interestRepository.findById(interest_id);
        if (interest.isEmpty()){
            Interest new_interest = new Interest();
            new_interest.setInterest_id(interest_id);
            new_interest.setLike_date(LocalDateTime.now());
            new_interest.setBeneficiary(beneficiaryRepository.findByBeneficiaryId(beneficiary_id));
            new_interest.setDonor(donorDetailsService.getDonorInfo());
            interestRepository.save(new_interest);
            toggled_info.setInterested(true);
        }
        else {
            interestRepository.deleteById(interest_id);
            toggled_info.setInterested(false);
        }
        return toggled_info;
    }
}