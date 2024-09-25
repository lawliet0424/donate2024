package com.hikdonate.donate.domain.donor.controller;

import com.hikdonate.donate.domain.donor.dto.PaymentRequest;
import com.hikdonate.donate.domain.donor.service.DonateStateService;
import com.hikdonate.donate.domain.donor.service.DonationBillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/*
Class name: DonationController
Summary: 기부하기 step4~ 과정 담당 컨트롤러
Date: 2024.09.10
Written by: 심민서
 */
@RequestMapping("/donation")
@RestController
@RequiredArgsConstructor
public class DonationController {

    private final DonationBillService donationBillService;
    private final DonateStateService donateStateService;

    /*
    Class name: savePaymentInfo
    Summary: 실제 결제하기 & 블록체인 트랜잭션 실행 로직
    Date: 2024.09.10
    Written by: 심민서
     */
    @PostMapping("/payment/submit")
    public String savePaymentInfo(@RequestBody PaymentRequest paymentRequest){
        System.out.println("savePaymentInfo 시작");
        String sessionId = paymentRequest.getPaymentInfo().getSessionId();
        String donorId = paymentRequest.getTransactionInfo().getDonorId();
        Long amount = paymentRequest.getTransactionInfo().getAmount();
        String[] beneficiariesId = paymentRequest.getTransactionInfo().getBeneficiaryId();
        System.out.println("Received Payment Info:" + paymentRequest);
        System.out.println("DonorId: " + donorId);
        System.out.println("Amount: " + amount);

        try {
            donateStateService.executeDonationTransaction(donorId, beneficiariesId, amount);
            return "ok";
        } catch (Exception e){
            return String.valueOf(ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage()));
        }
    }
}