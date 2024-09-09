package com.hikdonate.donate;

import com.hikdonate.contracts.DonateManagement;
import com.hikdonate.donate.donor.repository.DonateState;
import com.hikdonate.donate.donor.service.DonationWeb3Service;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.ClientTransactionManager;

import java.math.BigInteger;
import java.util.List;

import static com.hikdonate.donate.donor.repository.DonateState.State.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class DonationWeb3ServiceTest {

    @Mock
    private Web3j web3j;

    @Mock
    private ClientTransactionManager transactionManager;

    @Mock
    private DonateManagement donateManagement;

    @InjectMocks
    private DonationWeb3Service donationWeb3Service;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // 트랜잭션 1단계 테스트
    @Test
    void testSendTokenToDonor_Success() throws Exception {
        // 모킹된 트랜잭션 영수증 생성
        TransactionReceipt receipt = new TransactionReceipt();
        receipt.setStatus("0x1");  // 트랜잭션 성공을 나타내는 상태 코드

        // DonateManagement의 sendTokensToDonor 메서드 모킹
        RemoteFunctionCall<TransactionReceipt> mockFunctionCall = mock(RemoteFunctionCall.class);
        when(mockFunctionCall.send()).thenReturn(receipt);
        when(donateManagement.sendTokensToDonor(any(String.class), any(BigInteger.class))).thenReturn(mockFunctionCall);

        // 테스트 실행
        DonateState result = donationWeb3Service.sendTokenToDonor("0x8BfFE9820Fb1d4FEc2F335951b1d41BdDEF31477", 100L);

        // 상태가 성공으로 설정되었는지 확인
        assertEquals(TOKEN_SENT_TO_DONOR_SUCCESS, result.getCurrentState());
    }

    @Test
    void testSendTokenToDonor_Failure() throws Exception {
        // 모킹된 트랜잭션 영수증 생성
        TransactionReceipt receipt = new TransactionReceipt();
        receipt.setStatus("0x0");  // 트랜잭션 실패를 나타내는 상태 코드

        // DonateManagement의 sendTokensToDonor 메서드 모킹
        RemoteFunctionCall<TransactionReceipt> mockFunctionCall = mock(RemoteFunctionCall.class);
        when(mockFunctionCall.send()).thenReturn(receipt);
        when(donateManagement.sendTokensToDonor(any(String.class), any(BigInteger.class))).thenReturn(mockFunctionCall);

        // 테스트 실행
        DonateState result = donationWeb3Service.sendTokenToDonor("donorAddress", 100L);

        // 상태가 실패로 설정되었는지 확인
        assertEquals(TOKEN_SENT_TO_DONOR_FAILED, result.getCurrentState());
    }

    // 트랜잭션 2단계 테스트 (단일 수혜자)
    @Test
    void testSendTokensToBeneficiaryAndDonateBank_Success() throws Exception {
        // 모킹된 트랜잭션 영수증 생성
        TransactionReceipt receipt = new TransactionReceipt();
        receipt.setStatus("0x1");  // 트랜잭션 성공을 나타내는 상태 코드

        // DonateManagement의 triggerSendTokensToBeneficiaryAndDonateBank 메서드 모킹
        RemoteFunctionCall<TransactionReceipt> mockFunctionCall = mock(RemoteFunctionCall.class);
        when(mockFunctionCall.send()).thenReturn(receipt);
        when(donateManagement.triggerSendTokensToBeneficiaryAndDonateBank(any(String.class), any(String.class), any(BigInteger.class)))
                .thenReturn(mockFunctionCall);

        // 테스트 실행
        String[] beneficiaries = {"beneficiaryAddress"};
        DonateState result = donationWeb3Service.SendTokensToBeneficiaryAndDonateBank("donorAddress", beneficiaries, 50L);

        // 상태가 성공으로 설정되었는지 확인
        assertEquals(TOKEN_RECLAIMED_BY_DONATEBANK_SUCCESS, result.getCurrentState());
    }

    @Test
    void testSendTokensToBeneficiaryAndDonateBank_Failure() throws Exception {
        // 모킹된 트랜잭션 영수증 생성
        TransactionReceipt receipt = new TransactionReceipt();
        receipt.setStatus("0x0");  // 트랜잭션 실패를 나타내는 상태 코드

        // DonateManagement의 triggerSendTokensToBeneficiaryAndDonateBank 메서드 모킹
        RemoteFunctionCall<TransactionReceipt> mockFunctionCall = mock(RemoteFunctionCall.class);
        when(mockFunctionCall.send()).thenReturn(receipt);
        when(donateManagement.triggerSendTokensToBeneficiaryAndDonateBank(any(String.class), any(String.class), any(BigInteger.class)))
                .thenReturn(mockFunctionCall);

        // 테스트 실행
        String[] beneficiaries = {"beneficiaryAddress"};
        DonateState result = donationWeb3Service.SendTokensToBeneficiaryAndDonateBank("donorAddress", beneficiaries, 50L);

        // 상태가 실패로 설정되었는지 확인
        assertEquals(TOKEN_RECLAIMED_BY_DONATEBANK_FAILED, result.getCurrentState());
    }

    // 다중 수혜자 테스트
    @Test
    void testSendTokensToMultipleBeneficiaries() throws Exception {
        // 모킹된 트랜잭션 영수증 생성
        TransactionReceipt receipt = new TransactionReceipt();
        receipt.setStatus("0x1");  // 트랜잭션 성공을 나타내는 상태 코드

        // DonateManagement의 triggerSendBatchTokensToBeneficiaryAndDonateBank 메서드 모킹
        RemoteFunctionCall<TransactionReceipt> mockFunctionCall = mock(RemoteFunctionCall.class);
        when(mockFunctionCall.send()).thenReturn(receipt);
        when(donateManagement.triggerSendBatchTokensToBeneficiaryAndDonateBank(any(String.class), any(List.class), any(BigInteger.class)))
                .thenReturn(mockFunctionCall);

        // 테스트 실행
        String[] beneficiaries = {"beneficiary1", "beneficiary2"};
        DonateState result = donationWeb3Service.SendTokensToBeneficiaryAndDonateBank("donorAddress", beneficiaries, 100L);

        // 상태가 성공으로 설정되었는지 확인
        assertEquals(TOKEN_RECLAIMED_BY_DONATEBANK_SUCCESS, result.getCurrentState());
    }
}
