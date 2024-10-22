package com.hikdonate.donate.domain.transaction.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DonationDetail {
    private String beneficiaryName;
    private String txLink;
    private String status;
    private int amountPerPerson;
    private String walletFrom;
    private String walletTo;
    private String date;

    // 기본 생성자
    public DonationDetail() {}

    // 모든 필드를 받는 생성자
    public DonationDetail(String beneficiaryName, TransactionDetail transactionDetail, String txLink, String status) {
        this.beneficiaryName = beneficiaryName;
        this.amountPerPerson = transactionDetail.getAmountPerPerson();
        this.walletFrom = transactionDetail.getWalletFrom();
        this.walletTo = transactionDetail.getWalletTo();
        this.date = transactionDetail.getDate();
        this.txLink = txLink;
        // default : 모든 상황에서 SUCCESS 반환
        this.status = status;
    }
}
