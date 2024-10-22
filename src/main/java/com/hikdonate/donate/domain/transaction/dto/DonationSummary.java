package com.hikdonate.donate.domain.transaction.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DonationSummary {
    private String historyId;
    private int numberOfPeople;
    private String date;
    private int totalAmount;
    private List<String> beneficiaryList;

    // 기본 생성자
    public DonationSummary() {}

    // 모든 필드를 받는 생성자
    public DonationSummary(String historyId, int numberOfPeople, String date, int totalAmount, List<String> beneficiaryList) {
        this.historyId = historyId;
        this.numberOfPeople = numberOfPeople;
        this.date = date;
        this.totalAmount = totalAmount;
        this.beneficiaryList = beneficiaryList;
    }
}
