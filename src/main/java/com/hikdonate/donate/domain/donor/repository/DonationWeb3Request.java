package com.hikdonate.donate.domain.donor.repository;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
public class DonationWeb3Request {

    @Setter
    private String donorID;

    @Setter
    private List<String> beneficiaryIDList;

    @Setter
    private int amount;

}
