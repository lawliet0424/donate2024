package com.hikdonate.donate.donor.repository;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PaymentRequest {
    private PaymentInfo paymentInfo;
    private TransactionInfo transactionInfo;

    @Setter
    @Getter
    public static class TransactionInfo {
        // Getters and Setters
        private String donorId;
        private String[] beneficiaryId;
        private Long amount;
    }

        @Setter
        @Getter
        public static class PaymentInfo {
                // Getters and Setters
                private String sessionId;
                private String[] personnel;
                private Long perPerson;
        }
}
