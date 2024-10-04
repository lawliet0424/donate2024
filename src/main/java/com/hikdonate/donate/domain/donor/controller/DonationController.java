package com.hikdonate.donate.domain.donor.controller;

import com.hikdonate.donate.domain.beneficiary.domain.Beneficiary;
import com.hikdonate.donate.domain.beneficiary.repository.BeneficiaryRepository;
import com.hikdonate.donate.domain.donor.repository.DonorRepository;
import com.hikdonate.donate.domain.donor.domain.Donor;
import com.hikdonate.donate.domain.donor.dto.PaymentRequest;
import com.hikdonate.donate.domain.donor.service.DonateStateService;
import com.hikdonate.donate.domain.donor.service.DonationBillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/*
Class name: DonationController
Summary: 기부하기 step4~ 과정 담당 컨트롤러
Date: 2024.09.10
Written by: 심민서
 */
@RestController
@RequiredArgsConstructor
public class DonationController {

    private final DonationBillService donationBillService;
    private final DonateStateService donateStateService;
    private final DonorRepository donorRepository;
    private final BeneficiaryRepository beneficiaryRepository;

    /*
    Class name: savePaymentInfo
    Summary: 실제 결제하기 & 블록체인 트랜잭션 실행 로직
    Date: 2024.10.01
    Written by: 심민서
     */
    @PostMapping("/payment/submit")
    public String savePaymentInfo(@RequestBody PaymentRequest paymentRequest){
        System.out.println("savePaymentInfo 시작");
        String donorId = paymentRequest.getDonorId();
        Long amount = paymentRequest.getPerPerson();
        Long[] beneficiariesId = paymentRequest.getBeneficiaryList();
        System.out.println("Received Payment Info:" + paymentRequest);
        System.out.println("DonorId: " + donorId);
        System.out.println("Amount: " + amount);

        // donor Id -> donor wallet address로 변환
        Donor donor = donorRepository.findByDonorId(donorId)
                .orElseThrow(() -> new IllegalArgumentException("Donor with ID " + donorId + " not found."));
        String donor_wallet_addr = donor.getDonorWallet();
        System.out.println("Donor Wallet Address: " + donor_wallet_addr);

        // Beneficiaries Id -> Beneficiaries wallet address로 변환
        String[] beneficiaries_wallet_addr = new String[beneficiariesId.length];
        for (int i = 0; i < beneficiariesId.length; i++) {
            Beneficiary beneficiary = beneficiaryRepository.findByBeneficiaryId(Long.valueOf(beneficiariesId[i]));
            if (beneficiary == null) {
                throw new IllegalArgumentException("Beneficiary with ID " + beneficiariesId[i] + " not found.");
            }
            beneficiaries_wallet_addr[i] = beneficiary.getBeneficiaryWallet();
            System.out.println("Beneficiary Wallet Address: " + beneficiaries_wallet_addr[i]);
        }

        try {
            donateStateService.executeDonationTransaction(donor_wallet_addr, beneficiaries_wallet_addr, amount);
            return "ok";
        } catch (Exception e){
            return String.valueOf(ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage()));
        }
    }
}