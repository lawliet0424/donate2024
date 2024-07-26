package com.hikdonate.donate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigInteger;

/*
    Class name: DonateTokenBankController
    Summary: DonateTokenBankService에서 정의해둔 함수를 가져와서 RESTFUL API 형태로 mapping해주기
    Date: 2024.07.26
    Written by: 조현지
*/
@RestController
@RequestMapping("/token-bank")
public class DonateTokenBankController {

    @Autowired
    private DonateTokenBankService donateTokenBankService;

    @GetMapping("/initial-supply")
    public String getContractName() {
        return donateTokenBankService.getInitialSupply().toString();
    }

    @GetMapping("/total-supply")
    public String getTotalSupply() {
        return donateTokenBankService.getTotalSupply().toString();
    }
}
