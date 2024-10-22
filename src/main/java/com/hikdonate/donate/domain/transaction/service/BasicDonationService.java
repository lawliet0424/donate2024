package com.hikdonate.donate.domain.transaction.service;

import com.hikdonate.donate.domain.beneficiary.domain.Beneficiary;
import com.hikdonate.donate.domain.beneficiary.repository.BeneficiaryRepository;
import com.hikdonate.donate.domain.transaction.repository.TransactionHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public abstract class BasicDonationService {
    // intersection function : DonationSummaryService & DonationDetailService
    protected final BeneficiaryRepository beneficiaryRepository;
    protected final TransactionHistoryRepository transactionHistoryRepository;

    protected void validateBeneficiary(Beneficiary beneficiary) {
        if(beneficiary == null) {
            throw new IllegalArgumentException ("No matching beneficiary with wallet address!");
        }
    }

    protected String searchBeneficiaryNameFromWalletAddr(String walletAddr) {
        // 해당 wallet address를 가지는 수혜자 객체 가져오기
        Beneficiary beneficiary = beneficiaryRepository.findByBeneficiaryWallet(walletAddr);

        // Beneficiary 검증
        validateBeneficiary(beneficiary);

        // beneficiary name 반환
        return beneficiary.getBeneficiaryName();
    }
}
