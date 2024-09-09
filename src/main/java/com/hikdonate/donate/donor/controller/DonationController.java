package com.hikdonate.donate.donor.controller;

import com.hikdonate.donate.donor.service.DonateStateService;
import com.hikdonate.donate.donor.service.DonationBillService;
import com.hikdonate.donate.donor.repository.PaymentRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/donation")
@RestController
@RequiredArgsConstructor
public class DonationController {

    private final DonationBillService donationBillService;
    private final DonateStateService donateStateService;

    //실결
    @PostMapping("/payment")
    public String savePaymentInfo(@RequestBody PaymentRequest paymentRequest){
        System.out.println("savePaymentInfo 시작");
        String donorId = paymentRequest.getTransactionInfo().getDonorId();
        Long amount = paymentRequest.getTransactionInfo().getAmount();
        String[] beneficiariesId = paymentRequest.getTransactionInfo().getBeneficiaryId();
        System.out.println("Received Payment Info:" + paymentRequest);
        System.out.println("DonorId: " + donorId);
        System.out.println("Amount: " + amount);
        // paymentRequest.getPaymentInfo() 만들어 놓긴 했는데 (toss API를 위한) 필요없는 정보라 안받아옴
        try {
            donateStateService.executeDonationTransaction(donorId, beneficiariesId, amount);
            return "ok";
        } catch (Exception e){
            return String.valueOf(ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage()));
        }
    }
}