package com.hikdonate.donate.domain.transaction.service;

import com.hikdonate.donate.domain.beneficiary.repository.BeneficiaryRepository;
import com.hikdonate.donate.domain.transaction.dto.DonationDetail;
import com.hikdonate.donate.domain.transaction.dto.TransactionDetail;
import com.hikdonate.donate.domain.transaction.repository.TransactionHistoryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class DonationDetailService extends BasicDonationService {
    public DonationDetailService(BeneficiaryRepository beneficiaryRepository, TransactionHistoryRepository transactionHistoryRepository) {
        super(beneficiaryRepository, transactionHistoryRepository);
    }

    public List<DonationDetail> allTransactionDetailHistory(String transactionHash) {
        List<TransactionDetail> transactionDetailsList = searchTransactionDetailHistory(transactionHash);

        return transactionDetailsList.stream()
                .map(transactionDetail -> {
                    String beneficiaryName = searchBeneficiaryNameFromWalletAddr(transactionDetail.getWalletTo());
                    String txLink = transactionURL(transactionHash);
                    String status = "SUCCESS";
                    return new DonationDetail(beneficiaryName, transactionDetail, txLink, status);
                })
                .collect(Collectors.toList());
    }

    public String transactionURL(String transactionHash) {
        return "https://testnet.bscscan.com/tx/" + transactionHash;
    }

    public List<TransactionDetail> searchTransactionDetailHistory(String transactionHash) {
        return transactionHistoryRepository.findAllTransactionByTransactionHash(transactionHash);
    }

}
