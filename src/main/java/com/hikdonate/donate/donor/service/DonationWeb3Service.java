package com.hikdonate.donate.donor.service;
import com.hikdonate.contracts.DonateManagement;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.tx.RawTransactionManager;
import org.web3j.tx.gas.DefaultGasProvider;
import java.math.BigInteger;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DonationWeb3Service {
    @Value("${admin.address}")
    private String fromAddress; // Owner 주소

    @Value("${donateManagement.address}")
    private String donateManagement_addr;

    @Value("${admin.private-key}")
    private String privKey;


//    private final TagRepository tagRepository;
//    private final DonorRepository donorRepository;
//    private final BeneficiaryRepository beneficiaryRepository;

    private final Web3j web3j;
    private final Credentials credentials;

    private DonateManagement donateManagement;

    @PostConstruct
    private void init() {
        RawTransactionManager rawTransactionManager = new RawTransactionManager(web3j, credentials);

        // Wrapper로 감싸진 스마트 컨트랙트(ABI 파일)를 통해, 테스트넷 상의 스마트 컨트랙트를 가져오기
        donateManagement = DonateManagement.load(donateManagement_addr, web3j, rawTransactionManager, new DefaultGasProvider());
    }


    // 트랜잭션 1단계
    public String sendTokenToDonor(String donor, Long total_amount) throws Exception {
        String result = "";
        try {
            if (donateManagement.sendTokensToDonor(donor, BigInteger.valueOf((long) total_amount)).send().isStatusOK()){
                result = "success";
            }
        } catch (Exception e)  {
            System.out.println("Revert: " + e.getMessage());
            result = e.getMessage();
        }
        return result;
    }

    // 트랜잭션 2&3단계
    public String sendTokensToBeneficiaryAndDonateBank(String donor, String[] beneficiaries, Long divided_amount) throws Exception {
        String result="";

        int num_of_beneficiaries = 0;
        if (beneficiaries!= null) num_of_beneficiaries = beneficiaries.length;
        if (num_of_beneficiaries == 1){ // 단일 기부
            try {
                if (donateManagement.triggerSendTokensToBeneficiaryAndDonateBank(donor, beneficiaries[0], BigInteger.valueOf((long) divided_amount)).send().isStatusOK()){
                    result = "success";
                }
            } catch (Exception e) {
                System.out.println("Revert: " + e.getMessage());
                result = e.getMessage();
            }
        } else { // 다중 기부
            try {
                assert beneficiaries != null;
                if (donateManagement.triggerSendBatchTokensToBeneficiaryAndDonateBank(donor, List.of(beneficiaries), BigInteger.valueOf((long) divided_amount)).send().isStatusOK()) {
                    result = "success";
                }
            } catch (Exception e) {
                System.out.println("Revert: " + e.getMessage());
                result = e.getMessage();
            }
        }
        return result;
    }

    // 트랜잭션 2단계
    public String sendTokensToBeneficiary(String donor, String[] beneficiaries, Long divided_amount) throws Exception {
        String result="";

        try {
            if (donateManagement.sendTokensToBeneficiary(donor, List.of(beneficiaries).toString(), BigInteger.valueOf((long) divided_amount)).send().isStatusOK()) {
                result = "success";
            }
        } catch (Exception e) {
            System.out.println("Revert: " + e.getMessage());
            result = e.getMessage();
        }
        return result;
    }

    // 트랜잭션 3단계
    public String sendTokensToDonateBank(String donor, String[] beneficiaries, Long divided_amount) throws Exception {
        String result="";

        try {
            if (donateManagement.sendTokensToDonateBank(List.of(beneficiaries).toString(), BigInteger.valueOf((long) divided_amount)).send().isStatusOK()) {
                result = "success";
            }
        } catch (Exception e) {
            System.out.println("Revert: " + e.getMessage());
            result = e.getMessage();
        }
        return result;
    }

    public boolean saveTranscation(){
        // MongoDB에 기부 내역 저장 로직
        return true;
    }
}