package com.hikdonate.donate.domain.donor.dto;

import com.hikdonate.donate.domain.beneficiary.domain.Beneficiary;
import lombok.Getter;

import java.util.Set;

@Getter
public class DonorUpdateDto {
    String donorId;
    String donorPassword;
    String donorMail;
    String donorName;
    String donorNickname;
    int donorAge;
    String donorPhonenumber;
    String donorAccount;
    String donorWallet;
    Set<Beneficiary> likedBeneficiaries;
}
