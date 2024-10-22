package com.hikdonate.donate.domain.transaction.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TransactionDetail {
    private int amountPerPerson;
    private String walletFrom;
    private String walletTo;
    private String date;

    // 기본 생성자
    public TransactionDetail() {}

    // 모든 필드를 받는 생성자
    public TransactionDetail(int amountPerPerson, String walletFrom, String walletTo, String date) {
        this.amountPerPerson = amountPerPerson;
        this.walletFrom = walletFrom;
        this.walletTo = walletTo;
        this.date = date;
    }
}
