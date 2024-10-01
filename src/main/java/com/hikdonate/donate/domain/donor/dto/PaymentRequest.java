package com.hikdonate.donate.domain.donor.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PaymentRequest {

//    private String sessionId;
    private Long personnel;
    private Long perPerson;
    private String donorId;
    private Long[] beneficiaryList;
}
