import "./DonationStepTwo.css"; // CSS 파일 임포트
import React, { useState, useEffect } from "react"; // React 및 필요한 훅 임포트
import { useNavigate, useLocation } from "react-router-dom"; // React Router의 navigate 및 location 훅 임포트
import DonationStepsBar from "../../components/DonationStepsBar"; // 기부 단계 바 컴포넌트 임포트
import ColoredButton from "../../components/ColoredButton"; // 색상 버튼 컴포넌트 임포트
import {
  formatamountPerPerson,
  validateNumberOfPeopleAmount,
} from "../../utils/FormatValidate"; // 유틸리티 함수 임포트
import useBeneficiary from "../../hooks/useBeneficiary"; // 수혜자 훅 임포트

/*
Function name: DonationStepTwo
Summary: 기부 두 번째 단계 페이지 컴포넌트
Parameter: N/A
Return: 총 1개; 기부 두 번째 단계 페이지 컴포넌트
Caller: N/A
Date: 2024-09-22
Write by: 길정수
*/
const DonationStepTwo = () => {
  const navigate = useNavigate(); // navigate 훅 사용
  const location = useLocation(); // 현재 위치 가져오기

  const [numberOfPeople, setNumberOfPeople] = useState(""); // 기부자 수 상태
  const [amount, setAmount] = useState(""); // 기부 총액 상태
  const { getSelectedBeneficiaries } = useBeneficiary(); // 수혜자 관련 훅 사용

  useEffect(() => {
    const { fromFirstStep, fromThirdStep } = location.state || {};

    // 잘못된 접근 처리
    if (!fromFirstStep && !fromThirdStep) {
      window.alert("잘못된 접근입니다. 홈으로 이동합니다.");
      navigate("/"); // 홈으로 이동
      return;
    }

    const { numberOfPeople: savedNumberOfPeople, amount: savedAmount } =
      location.state; // 이전 단계에서 저장된 값 가져오기
    setNumberOfPeople(savedNumberOfPeople); // 상태 업데이트
    setAmount(savedAmount); // 상태 업데이트
  }, [location.state, navigate]);

  const amountPerPerson =
    numberOfPeople && amount ? amount / numberOfPeople : 0; // 1인당 기부 금액 계산

  const onNextButtonClicked = () => {
    const errorMessage = validateNumberOfPeopleAmount(
      numberOfPeople,
      amount,
      formatamountPerPerson(amountPerPerson)
    ); // 유효성 검사
    if (errorMessage) {
      window.alert(errorMessage); // 에러 메시지 출력
      return;
    }

    getSelectedBeneficiaries(
      location.state.selectedTags,
      numberOfPeople,
      formatamountPerPerson(amountPerPerson)
    );

    navigate("/donation/step3", {
      state: {
        fromSecondStep: true,
        selectedTags: location.state.selectedTags,
        numberOfPeople: numberOfPeople,
        amount: amount,
        amountPerPerson: formatamountPerPerson(amountPerPerson), // 포맷팅된 1인당 기부 금액
      },
    });
  };

  const onBeforeButtonClicked = () => {
    navigate("/donation/step1", {
      state: {
        selectedTags: location.state.selectedTags,
      },
    });
  };

  return (
    <div className="donation-step-two">
      <DonationStepsBar currentStep={2} /> {/* 현재 단계 표시 */}
      <div className="donation-step-two__text">
        <input
          className="donation-step-two__input--numberOfPeople"
          type="number"
          min="1"
          value={numberOfPeople || ""}
          onChange={(e) => setNumberOfPeople(Number(e.target.value))} // 기부자 수 입력 처리
        />
        <div>명에게</div>
        <input
          className="donation-step-two__input--amount"
          type="number"
          min="1000" // 최소 금액 설정
          value={amount || ""}
          onChange={(e) => setAmount(Number(e.target.value))} // 총액 입력 처리
        />
        <div>원을 나눠 기부합니다.</div>
      </div>
      <div className="donation-step-two__result">
        {numberOfPeople > 0 && amount > 0 ? (
          <>
            수혜자 한 명당{" "}
            <span className="donation-step-two__perPersonAmount">
              {formatamountPerPerson(amountPerPerson).toLocaleString()}원
            </span>{" "}
            기부됩니다
          </>
        ) : (
          "수혜자 한 명당 1,000원 이상 기부되도록 입력해주세요."
        )}
      </div>
      <div className="donation-step-two__explanation">
        *소수점 이하 금액은 블록체인 수수료로 사용됩니다.
      </div>
      <div className="donation-step-two__navigation">
        <ColoredButton
          text={"이전"} // 이전 버튼 텍스트
          onClick={onBeforeButtonClicked} // 이전 단계로 이동 핸들러
          className={"donation-step-two__button"} // 버튼 클래스
        />
        <ColoredButton
          text={"다음"} // 다음 버튼 텍스트
          colorScheme={"orange"} // 버튼 색상
          onClick={onNextButtonClicked} // 다음 단계로 이동 핸들러
          className={"donation-step-two__button"} // 버튼 클래스
        />
      </div>
    </div>
  );
};

export default DonationStepTwo; // DonationStepTwo 컴포넌트 내보내기