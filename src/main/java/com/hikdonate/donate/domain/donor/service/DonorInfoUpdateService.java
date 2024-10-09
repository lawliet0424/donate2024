package com.hikdonate.donate.domain.donor.service;

import com.hikdonate.donate.domain.beneficiary.domain.Beneficiary;
import com.hikdonate.donate.domain.donor.domain.Donor;
import com.hikdonate.donate.domain.donor.repository.DonorRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class DonorInfoUpdateService {

    DonorRepository donorRepository;
    DonorDetailsService donorDetailsService;

    public Donor updateDonorInfo(String donorId,
                                 String donorPassword,
                                 String donorMail,
                                 String donorName,
                                 String donorNickname,
                                 int donorAge,
                                 String donorPhonenumber,
                                 String donorAccount,
                                 String donorWallet,
                                 Set<Beneficiary> likedBeneficiaries) {

        Donor donor = donorDetailsService.getDonorInfo();

        donor.setDonorMail(donorMail);
        donor.setDonorName(donorName);
        donor.setDonorNickname(donorNickname);
        donor.setDonorAge(donorAge);
        donor.setDonorPhonenumber(donorPhonenumber);
        donor.setDonorAccount(donorAccount);

        return donor;
    }



}
