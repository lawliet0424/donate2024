package com.hikdonate.donate;

import com.hikdonate.contracts.DonateTokenBank;
import com.hikdonate.contracts.MultiTokenTransfer;
import com.hikdonate.contracts.TokenTransfer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DonateService {
    private DonateTokenBank donateTokenBank;
    private TokenTransfer tokenTransfer;
    private MultiTokenTransfer multiTokenTransfer;

    @Autowired
    public DonateService(DonateTokenBank donateTokenBank, TokenTransfer tokenTransfer, MultiTokenTransfer multiTokenTransfer) {
        this.donateTokenBank = donateTokenBank;
        this.tokenTransfer = tokenTransfer;
        this.multiTokenTransfer = multiTokenTransfer;
    }
}
