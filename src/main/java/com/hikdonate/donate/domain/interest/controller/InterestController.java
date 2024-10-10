package com.hikdonate.donate.domain.interest.controller;

import com.hikdonate.donate.domain.donor.service.DonorDetailsService;
import com.hikdonate.donate.domain.interest.dao.ToggleInterestRequest;
import com.hikdonate.donate.domain.interest.dto.ToggledInterestResponse;
import com.hikdonate.donate.domain.interest.service.ToggleInterestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class InterestController {
    private final ToggleInterestService toggleInterestService;
    private final DonorDetailsService donorDetailsService;

    @PostMapping("/interest/toggle")
    public ToggledInterestResponse toggleInterest(@RequestBody ToggleInterestRequest toggleInterestRequest){
        return toggleInterestService.toggleInterest(donorDetailsService.getCurrentDonorId(), toggleInterestRequest.getBeneficiaryId());
    }
}
