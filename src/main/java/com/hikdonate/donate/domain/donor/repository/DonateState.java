package com.hikdonate.donate.domain.donor.repository;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class DonateState {

    @Getter @Setter
    private State currentState = State.NOT_STARTED;

    @Getter @Setter
    private String errorMessage;

    @Getter @Setter
    private List<String> reverted_beneficiaries;

    public enum State  {
        NOT_STARTED, // 기부 시작하지 않음
        PAYMENT_COMPLETED, // 결제 완료
        PAYMENT_FAILED, // 결제 실패
        TOKEN_SENT_TO_DONOR_SUCCESS, // 기부자에게 토큰 전송 성공
        TOKEN_SENT_TO_DONOR_FAILED, // 기부자에게 토큰 전송 실패
        TOKEN_SENT_TO_BENEFICIARY_SUCCESS, // 수혜자에게 토큰 전송 성공
        TOKEN_SENT_TO_BENEFICIARY_FAILED, // 수혜자에게 토큰 전송 실패
        CONVEYED_TO_BENEFICIARY_SUCCESS, // 수혜자에게 기부금 송금 성공
        CONVEYED_TO_BENEFICIARY_FAILED, // 수혜자에게 기부금 송금 실패
        TOKEN_RECLAIMED_BY_DONATEBANK_SUCCESS, // DonateBank로 토큰 회수 성공
        TOKEN_RECLAIMED_BY_DONATEBANK_FAILED, // DonateBank로 토큰 회수 실패
        DONATION_COMPLETED // 기부 완료
    }
}
