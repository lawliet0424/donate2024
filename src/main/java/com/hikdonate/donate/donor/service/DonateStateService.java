package com.hikdonate.donate.donor.service;

import com.hikdonate.donate.donor.repository.DonateState;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import static com.hikdonate.donate.donor.repository.DonateState.State.*;
import static com.hikdonate.donate.donor.repository.DonateState.State.TOKEN_RECLAIMED_BY_DONATEBANK_FAILED;

@RequiredArgsConstructor
@Service
public class DonateStateService {
    private final ConcurrentHashMap<UUID, DonateState> donateStateMap = new ConcurrentHashMap<>(); // 각 기부별 상태 저장
    private final DonationWeb3Service donationWeb3Service;
    private final DonationBillService donationBillService;

    // 금융거래와 블록체인 트랜잭션의 순차 실행 및 상태 저장 함수
    public void executeDonationTransaction(String donorId, String[] beneficiaryId, Long divided_amount) throws Exception {
        // donation ID 생성
        UUID donationId = createDonateState();
        String result = "";

        // 실결
        result= donationBillService.processPayment();
        updateState(donationId, result, PAYMENT_COMPLETED, PAYMENT_FAILED);

        // 스마트 컨트랙트 1단계 실행
        result = donationWeb3Service.sendTokenToDonor(donorId, divided_amount * beneficiaryId.length);
        updateState(donationId, result, TOKEN_SENT_TO_DONOR_SUCCESS, TOKEN_SENT_TO_DONOR_FAILED);

        // 수혜자에게 기부금 전달
        result = donationBillService.processPayment();
        updateState(donationId, result, CONVEYED_TO_BENEFICIARY_SUCCESS, CONVEYED_TO_BENEFICIARY_FAILED);

        // 스마트 컨트랙트 2&3단계 실행
        result = donationWeb3Service.sendTokensToBeneficiaryAndDonateBank(donorId, beneficiaryId, divided_amount);
        updateState(donationId, result, TOKEN_RECLAIMED_BY_DONATEBANK_SUCCESS, TOKEN_RECLAIMED_BY_DONATEBANK_FAILED);

    }

    public void handleDonationError(UUID error_donationId) {
        // 작성중
    }

    // 개별 기부에 대한 상태 생성 & 기부 ID 반환
    public UUID createDonateState() {
        DonateState donateState = new DonateState();
        UUID donationId = UUID.randomUUID();
        donateStateMap.put(donationId, donateState);
        return donationId;
    }

    // 특정 기부의 현재 상태를 조회
    public DonateState.State getCurrentState(UUID donationId) {
        DonateState donateState = donateStateMap.get(donationId);
        return (donateState != null) ? donateState.getCurrentState() : null;
    }

    // 특정 기부의 상태를 업데이트
    public void updateState(UUID donationId, String result, DonateState.State success_state, DonateState.State fail_state) {
        DonateState donateState = donateStateMap.get(donationId);
        if (donateState != null) {
            if (Objects.equals(result, "success")) {
                donateState.setCurrentState(success_state);
            } else {
                donateState.setCurrentState(fail_state);
                setErrorMessage(donationId, result);
                handleDonationError(donationId);
            }
        }
    }

    // 특정 기부의 오류 메시지를 설정
    public void setErrorMessage(UUID donationId, String errorMessage) {
        DonateState donateState = donateStateMap.get(donationId);
        if (donateState != null) {
            donateState.setErrorMessage(errorMessage);
        }
    }

    // 특정 기부의 오류 메시지를 조회
    public String getErrorMessage(UUID donationId) {
        DonateState donateState = donateStateMap.get(donationId);
        return (donateState != null) ? donateState.getErrorMessage() : null;
    }

    // 특정 기부 가져오기
    public DonateState getDonateState(UUID donationId) {
        return donateStateMap.get(donationId);
    }

    // 특정 기부 존재 여부 확인
    public boolean validDonateState(UUID donationId) {
        return donateStateMap.get(donationId) != null;
    }

    // 특정 기부 상태 삭제
    public void deleteDonateState(UUID donationId) throws Exception {
        try {
            if (validDonateState(donationId)) {
                donateStateMap.remove(donationId);  // 상태 삭제
            }
            else
            {
                throw new IllegalArgumentException("Invalid donation ID: " + donationId);
            }
        } catch (IllegalArgumentException e) {
            //****************
            // 예외 처리 어떻게 진행할지 합의보기
            //****************
        }
    }

    // 특정 기부의 수혜자 리스트를 업데이트
    public void updateRevertedBeneficiaries(UUID donationId, List<String> beneficiaries) {
        DonateState donateState = donateStateMap.get(donationId);
        if (donateState != null) {
            donateState.setReverted_beneficiaries(beneficiaries);
        }
    }

    // 특정 기부의 수혜자 리스트를 조회
    public List<String> getRevertedBeneficiaries(UUID donationId) {
        DonateState donateState = donateStateMap.get(donationId);
        return (donateState != null) ? donateState.getReverted_beneficiaries() : null;
    }

    public void saveState(UUID donationId) {
        // DB 또는 메모리에서 상태 저장 로직
        // 예: MongoDB 저장
//        donateStateRepository.save(state);
    }
}
