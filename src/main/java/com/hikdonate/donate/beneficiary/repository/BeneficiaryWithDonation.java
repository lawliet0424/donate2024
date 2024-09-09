package com.hikdonate.donate.beneficiary.repository;

import com.hikdonate.donate.beneficiary.Beneficiary;
import lombok.Getter;

@Getter
public class BeneficiaryWithDonation {
    private Beneficiary beneficiary;
    private Long totalDonations;

    public BeneficiaryWithDonation(Beneficiary beneficiary, Long totalDonations) {
        this.beneficiary = beneficiary;
        this.totalDonations = totalDonations;
    }

}
