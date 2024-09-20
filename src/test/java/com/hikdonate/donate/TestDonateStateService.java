package com.hikdonate.donate;

import com.hikdonate.donate.domain.donor.repository.DonateState;
import com.hikdonate.donate.domain.donor.service.DonateStateService;
import com.hikdonate.donate.domain.donor.service.DonationBillService;
import com.hikdonate.donate.domain.donor.service.DonationWeb3Service;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Fail.fail;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;


@SpringBootTest
@Transactional
public class TestDonateStateService {

    @Autowired
    DonateStateService donateStateService;
    @Autowired
    DonationWeb3Service donationWeb3Service;
    @Autowired
    DonationBillService donationBillService;

    @Autowired
    Web3j web3j;

    @Autowired
    Credentials credentials;

    @BeforeEach
    public void beforeEach() {
        donationWeb3Service = new DonationWeb3Service(web3j, credentials);
        donateStateService = new DonateStateService(donationWeb3Service, donationBillService);
    }

    /*
    기부 상태 객체 생성 및 기부 상태 확인
    */
    @Test
    void createStateAndCheckState() throws Exception {
        // given
        UUID stateID1 = donateStateService.createDonateState();

        // when
        DonateState.State currentState = donateStateService.getCurrentState(stateID1);
        DonateState donateState1 = donateStateService.getDonateState(stateID1);
        DonateState.State checkState = donateState1.getCurrentState();

        // then
        assertThat(currentState).isEqualTo(checkState);
        donateStateService.deleteDonateState(stateID1);
    }

    /*
    기부 상태 객체 생성 및 디폴트 기부 상태 설정 확인
    */
    @Test
    void createStateAndCheckDefaultState() throws Exception {
        // given
        UUID stateID1 = donateStateService.createDonateState();

        // when
        DonateState.State checkState = donateStateService.getCurrentState(stateID1);

        // then
        assertThat(checkState).isEqualTo(DonateState.State.NOT_STARTED);
        donateStateService.deleteDonateState(stateID1);
    }

    /*
    기부 상태 객체 삭제 유무 확인
    */
    @Test
    void deleteStateAndCheckDeletion() throws Exception {
        // given
        UUID stateID1 = donateStateService.createDonateState();

        // when
        Boolean existResultBefore = donateStateService.validDonateState(stateID1);
        assertThat(existResultBefore).isEqualTo(true);
        donateStateService.deleteDonateState(stateID1);

        // then
        Boolean existResultAfter = donateStateService.validDonateState(stateID1);
        assertThat(existResultAfter).isEqualTo(false);
    }

    /*
    기부 상태 삭제 로직 정상 작동 여부 확인
    */
    @Test
    public void doubleDeleteCheck() throws Exception {
        // given
        UUID stateID1 = donateStateService.createDonateState();

        // when
        donateStateService.deleteDonateState(stateID1);

        // then
        try {
            donateStateService.deleteDonateState(stateID1);
            fail("Exception must be occured!");  // 예외가 발생하지 않으면 테스트 실패
        } catch (IllegalArgumentException e) {
            // 예외가 발생하면 이 블록으로 들어오게 됨
            // 예외 메시지나 기타 검증을 추가할 수 있음
            assertThat("Can't delete invalid donation. Donation ID: " + stateID1).isEqualTo(e.getMessage());
        }
    }

    /*
    기부가 성공했을 때, 작동되는 로직이 정상적으로 작동되는지 확인
    */
    @Test
    public void changeStateAndCheckSuccess() throws Exception {
        // given
        UUID stateID1 = donateStateService.createDonateState();
        String result = "success";

        // when
        donateStateService.updateState(stateID1, result, DonateState.State.PAYMENT_COMPLETED, DonateState.State.PAYMENT_FAILED);

        // then
        DonateState.State checkState = donateStateService.getCurrentState(stateID1);
        assertThat(checkState).isEqualTo(DonateState.State.PAYMENT_COMPLETED);
        donateStateService.deleteDonateState(stateID1);
    }

    /*
    에러 메세지와 반환된 기부자 리스트의 디폴트 설정 확인
    */
    @Test
    public void checkDefaultErrorMessageAndBeneficiaryList() throws Exception {
        // given
        UUID stateID1 = donateStateService.createDonateState();

        // when
        String checkErrorMessages = donateStateService.getErrorMessage(stateID1);
        List<String> checkRevertedBeneficiaryList = donateStateService.getRevertedBeneficiaries(stateID1);

        // then
        assertThat(checkErrorMessages)
                .withFailMessage("에러 메세지 초기값이 일치하지 않습니다. 실제 값: %s (타입: %s)    예상한 값: %s",
                        checkErrorMessages, (checkErrorMessages == null ? "null" : checkErrorMessages.getClass().getName()), null)
                .isEqualTo(null);
        assertThat(checkRevertedBeneficiaryList)
                .withFailMessage("리버트된 수혜자 초기값이 일치하지 않습니다. 실제 값: %s (타입: %s)    예상한 값: %s",
                        checkRevertedBeneficiaryList, (checkRevertedBeneficiaryList == null ? "null" : checkRevertedBeneficiaryList.getClass().getName()), null)
                .isEqualTo(null);
        donateStateService.deleteDonateState(stateID1);
    }

    /*
    에러 메시지와 반환된 수혜자 리스트를 업데이트했을 때, 변경된 내용이 정상적으로 반영되는지 확인
    */
    @Test
    public void checkAndUpdateErrorMessageAndRevertedBeneficiaryList() throws Exception {
        // given
        UUID stateID1 = donateStateService.createDonateState();

        String testErrorMessage = "테스트 에러 메세지 입력";
        List<String> testRevertedBeneficiaryList = new ArrayList<>();
        testRevertedBeneficiaryList.add("A");
        testRevertedBeneficiaryList.add("B");
        testRevertedBeneficiaryList.add("C");

        // when
        donateStateService.setErrorMessage(stateID1, testErrorMessage);
        donateStateService.updateRevertedBeneficiaries(stateID1, testRevertedBeneficiaryList);

        // then
        assertThat(testErrorMessage).isEqualTo(donateStateService.getErrorMessage(stateID1));
        assertThat(testRevertedBeneficiaryList).isEqualTo(donateStateService.getRevertedBeneficiaries(stateID1));
        donateStateService.deleteDonateState(stateID1);
    }
}
