package com.hikdonate.donate.domain.donor.service;

import org.springframework.stereotype.Service;


/*
Class name: DonationBillService
Summary: 결제 API를 호출하고 결과 반환하는 서비스 (현재는 무조건 succress를 반환)
Date: 2024.09.10
Written by: 심민서
*/
@Service
public class DonationBillService {
    public String processPayment(/*PaymentInfo paymentInfo*/) {
        return "success";
    }
}