package com.hikdonate.donate.domain.donor.service;

import com.hikdonate.donate.domain.donor.repository.DonateState;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@RequiredArgsConstructor
@Service
public class DonateStateService {

    // 각 기부별 상태 저장
    private final ConcurrentHashMap<UUID, DonateState> donateStateMap = new ConcurrentHashMap<>();
    private final DonationWeb3Service donationWeb3Service;
    private final DonationBillService donationBillService;

    // 금융거래와 블록체인 트랜잭션의 순차 실행 및 상태 저장 함수
    public void executeDonationTransaction(String donorId, String[] beneficiaryId, Long divided_amount) throws Exception {
        // donation ID 생성
        UUID donationId = createDonateState();
        String result = "";

        // 실결
        result= donationBillService.processPayment();
        //updateState(donationId, result, PAYMENT_COMPLETED, PAYMENT_FAILED);

        // 스마트 컨트랙트 1단계 실행
        result = donationWeb3Service.sendTokenToDonor(donorId, divided_amount * beneficiaryId.length);
        //updateState(donationId, result, TOKEN_SENT_TO_DONOR_SUCCESS, TOKEN_SENT_TO_DONOR_FAILED);

        // 수혜자에게 기부금 전달
        result = donationBillService.processPayment();
        //pdateState(donationId, result, CONVEYED_TO_BENEFICIARY_SUCCESS, CONVEYED_TO_BENEFICIARY_FAILED);

        // 스마트 컨트랙트 2&3단계 실행
        result = donationWeb3Service.sendTokensToBeneficiaryAndDonateBank(donorId, beneficiaryId, divided_amount);
        //updateState(donationId, result, TOKEN_RECLAIMED_BY_DONATEBANK_SUCCESS, TOKEN_RECLAIMED_BY_DONATEBANK_FAILED);

    }

    public void handleDonationError(UUID error_donationId) {
        // 작성중
    }

    /*
    Function name: createDonateState
    Summary: 개별 기부에 대한 기부 상태 객체 생성 & 기부별 고유 ID 반환
    Parameter: None
    Return: UUID -> 기부 상태의 고유 ID
    Caller: DonateStateService
    Date: 2024.09.08
    Written by: 조현지
    */
    public UUID createDonateState() {
        DonateState donateState = new DonateState();
        UUID donationId = UUID.randomUUID();
        donateStateMap.put(donationId, donateState);
        return donationId;
    }

    /*
    Function name: getCurrentState
    Summary: 특정 기부 상태 객체의 현재 기부 상태를 조회
    Parameter: 1개
        UUID donationId : 조회하고자 하는 기부 상태의 고유 ID
    Return: DonateState.State -> 현재 기부 상태
    Caller: DonateStateService
    Date: 2024.09.08
    Written by: 조현지
    */
    public DonateState.State getCurrentState(UUID donationId) throws Exception {
        DonateState donateState = getDonateState(donationId);
        return donateState.getCurrentState();
    }

    /*
    Function name: updateState
    Summary: 특정 기부 상태 객체의 기부 상태를 업데이트
    Parameter: 4개
        UUID donationId : 조회하고자 하는 기부 상태의 고유 ID
        String result : 현재 단계의 수행 결과
        DonateState.State success_state : 수행이 성공했을 때의 기부 상태
        DonateState.State fail_state : 수행이 실패했을 때의 기부 상태
    Return: None
    Caller: DonateStateService
    Date: 2024.09.08
    Written by: 조현지
    */
    // 특정 기부의 상태를 업데이트
    public void updateState(UUID donationId, String result, DonateState.State success_state, DonateState.State fail_state) throws Exception {
        DonateState donateState = getDonateState(donationId);
        if (Objects.equals(result, "success")) {
                donateState.setCurrentState(success_state);
        } else {
                donateState.setCurrentState(fail_state);
                setErrorMessage(donationId, result);
                handleDonationError(donationId);
        }
    }

    /*
    Function name: setErrorMessage
    Summary: 특정 기부 상태 객체의 오류 메시지를 설정
    Parameter: 2개
        UUID donationId : 조회하고자 하는 기부 상태의 고유 ID
        String errorMessage : 새롭게 변경하고자 하는 에러 메세지 내용
    Return: None
    Caller: DonateStateService
    Date: 2024.09.08
    Written by: 조현지
    */
    public void setErrorMessage(UUID donationId, String errorMessage) throws Exception {
        DonateState donateState = getDonateState(donationId);
        donateState.setErrorMessage(errorMessage);
    }

    /*
    Function name: getErrorMessage
    Summary: 특정 기부 상태 객체의 오류 메시지를 조회
    Parameter: 1개
        UUID donationId : 조회하고자 하는 기부 상태의 고유 ID
    Return: String -> 현재 기부 상태의 오류 메세지 조회하기
    Caller: DonateStateService
    Date: 2024.09.08
    Written by: 조현지
    */
    public String getErrorMessage(UUID donationId) throws Exception {
        DonateState donateState = getDonateState(donationId);
        return donateState.getErrorMessage();
    }

    /*
    Function name: getDonateState
    Summary: 특정 기부 상태 객체 가져오기
    Parameter: 1개
        UUID donationId : 조회하고자 하는 기부 상태의 고유 ID
    Return: DonateState -> 가져오고자 하는 기부 상태 객체
    Caller: DonateStateService
    Date: 2024.09.08
    Written by: 조현지
    */
    public DonateState getDonateState(UUID donationId) throws Exception {
        try {
            if (validDonateState(donationId)) {
                return donateStateMap.get(donationId);  // 상태 가져오기
            }
            else
            {
                throw new IllegalArgumentException("Can't get invalid donation. Donation ID: " + donationId);
            }
        } catch (IllegalArgumentException e) {
            //****************
            // 예외 처리 어떻게 진행할지 합의보기
            //****************
            throw e;
        }
    }

    /*
    Function name: validDonateState
    Summary: 특정 기부 상태 객체의 존재 여부 확인
    Parameter: 1개
        UUID donationId : 조회하고자 하는 기부 상태의 고유 ID
    Return: Boolean -> ConcurrentHashMap에 조회하려는 기부 상태 객체가 존재하는지 검증
    Caller: DonateStateService
    Date: 2024.09.08
    Written by: 조현지
    */
    public boolean validDonateState(UUID donationId) {
        return donateStateMap.get(donationId) != null;
    }

    /*
    Function name: deleteDonateState
    Summary: 특정 기부 상태 객체 삭제
    Parameter: 1개
        UUID donationId : 조회하고자 하는 기부 상태의 고유 ID
    Return: None
    Caller: DonateStateService
    Date: 2024.09.08
    Written by: 조현지
    */
    public void deleteDonateState(UUID donationId) throws Exception {
        try {
            if (validDonateState(donationId)) {
                donateStateMap.remove(donationId);  // 상태 삭제
            }
            else
            {
                throw new IllegalArgumentException("Can't delete invalid donation. Donation ID: " + donationId);
            }
        } catch (IllegalArgumentException e) {
            //****************
            // 예외 처리 어떻게 진행할지 합의보기
            //****************
            throw e;
        }
    }

    /*
    Function name: updateRevertedBeneficiaries
    Summary: 특정 기부 상태 객체의 수혜자 리스트를 업데이트
    Parameter: 2개
        UUID donationId : 조회하고자 하는 기부 상태의 고유 ID
        List<String> beneficiaries : 새롭게 변경하고자 하는 수혜자 리스트
    Return: None
    Caller: DonateStateService
    Date: 2024.09.08
    Written by: 조현지
    */
    public void updateRevertedBeneficiaries(UUID donationId, List<String> beneficiaries) throws Exception {
        DonateState donateState = getDonateState(donationId);
        donateState.setReverted_beneficiaries(beneficiaries);
    }

    /*
    Function name: getRevertedBeneficiaries
    Summary: 특정 기부 상태 객체의 수혜자 리스트를 조회
    Parameter: 1개
        UUID donationId : 조회하고자 하는 기부 상태의 고유 ID
    Return: List<String> -> 기부 상태 객체의 수혜자 리스트 가져오기
    Caller: DonateStateService
    Date: 2024.09.08
    Written by: 조현지
    */
    public List<String> getRevertedBeneficiaries(UUID donationId) throws Exception {
        DonateState donateState = getDonateState(donationId);
        return donateState.getReverted_beneficiaries();
    }
}
