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

    /*
    Function name: getInitialSupply
    Summary: DonateTokenBank 스마트 계약에 명시된 InitialSupply 가져오기
    Parameter: 없음
    Return: 총 1개, donateTokenBankService의 getInitialSupply()함수를 통해 값 불러오기
    Date: 2024.07.26
    Written by: 조현지
    */
    @GetMapping("/initial-supply")
    public String getInitialSupply() {
        return donateTokenBankService.getInitialSupply().toString();
    }

    /*
    Function name: getTotalSupply
    Summary: DonateTokenBank 스마트 계약에 명시된 totalSupply 가져오기
    Parameter: 없음
    Return: 총 1개, donateTokenBankService의 getTotalSupply()함수를 통해 값 불러오기
    Date: 2024.07.26
    Written by: 조현지
    */
    @GetMapping("/total-supply")
    public String getTotalSupply() {
        return donateTokenBankService.getTotalSupply().toString();
    }
}
