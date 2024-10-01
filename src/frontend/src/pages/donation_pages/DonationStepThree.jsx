import "./DonationStepThree.css"; // CSS 파일 임포트
import React, { useEffect } from "react"; // React 및 필요한 훅 임포트
import { useLocation, useNavigate } from "react-router-dom"; // React Router의 navigate 및 location 훅 임포트
import DonationStepsBar from "../../components/DonationStepsBar"; // 기부 단계 바 컴포넌트 임포트
import BeneficiaryBox from "../../components/BeneficiaryBox"; // 수혜자 박스 컴포넌트 임포트
import ColoredButton from "../../components/ColoredButton"; // 색상 버튼 컴포넌트 임포트
import useBeneficiary from "../../hooks/useBeneficiary"; // 수혜자 훅 임포트

/*
Function name: DonationStepThree
Summary: 기부 세 번째 단계 페이지 컴포넌트
Parameter: N/A
Return: 총 1개; 기부 세 번째 단계 페이지 컴포넌트
Caller: N/A
Date: 2024-09-22
Write by: 길정수
*/
const DonationStepThree = () => {
  const location = useLocation(); // 현재 위치 가져오기
  const navigate = useNavigate(); // navigate 훅 사용
  const { beneficiaries } = useBeneficiary(); // 수혜자 관련 훅 사용

  useEffect(() => {
    // 잘못된 접근 처리
    if (!location.state || !location.state.fromSecondStep) {
      window.alert("잘못된 접근입니다. 홈으로 이동합니다.");
      navigate("/"); // 홈으로 이동
      return;
    }
  }, [location.state, navigate]);

  const onNextButtonClicked = () => {
    navigate("/donation/payment", {
      state: {
        fromThirdStep: true,
        selectedTags: location.state.selectedTags,
        numberOfPeople: location.state.numberOfPeople,
        amount: location.state.amount,
        amountPerPerson: location.state.amountPerPerson,
        beneficiaryList: beneficiaries.map((b) => b.beneficiaryId), // beneficiaries에서 ID를 추출
      },
    });
  };

  const onBeforeButtonClicked = () => {
    navigate("/donation/step2", {
      state: {
        fromThirdStep: true,
        selectedTags: location.state.selectedTags,
        numberOfPeople: location.state.numberOfPeople,
        amount: location.state.amount,
      },
    });
  };

  return (
    <div className="donation-step-three">
      <DonationStepsBar currentStep={3} /> {/* 현재 단계 표시 */}
      <div className="donation-step-three__beneficiaries">
        {beneficiaries.map((beneficiary) => (
          <BeneficiaryBox
            key={beneficiary.beneficiaryId}
            beneficiaryId={beneficiary.beneficiaryId} // 수혜자 ID
            selectedTags={location.state.selectedTags} // 선택된 태그 전달
          />
        ))}
      </div>
      <div className="donation-step-three__navigation">
        <ColoredButton
          text={"이전"} // 이전 버튼 텍스트
          onClick={onBeforeButtonClicked} // 이전 단계로 이동 핸들러
          className={"donation-step-three__button"} // 버튼 클래스
        />
        <ColoredButton
          text={"결제하기"} // 결제하기 버튼 텍스트
          colorScheme={"orange"} // 버튼 색상
          onClick={onNextButtonClicked} // 결제 페이지로 이동 핸들러
          className={"donation-step-three__button"} // 버튼 클래스
        />
      </div>
    </div>
  );
};

export default DonationStepThree; // DonationStepThree 컴포넌트 내보내기