package com.hikdonate.donate.web3jAPI;

import com.hikdonate.donate.web3jAPI.contracts.DonateTokenBank;
import com.hikdonate.donate.web3jAPI.contracts.MultiTokenTransfer;
import com.hikdonate.donate.web3jAPI.contracts.TokenTransfer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContractService {
    private DonateTokenBank donateTokenBank;
    private TokenTransfer tokenTransfer;
    private MultiTokenTransfer multiTokenTransfer;

    @Autowired
    public ContractService(DonateTokenBank donateTokenBank, TokenTransfer tokenTransfer, MultiTokenTransfer multiTokenTransfer) {
        this.donateTokenBank = donateTokenBank;
        this.tokenTransfer = tokenTransfer;
        this.multiTokenTransfer = multiTokenTransfer;
    }
}

