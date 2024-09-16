import "./DonationStepThree.css";
import React, { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DonationStepsBar from "../../components/DonationStepsBar";
import BeneficiaryBox from "../../components/BeneficiaryBox";
import ColoredButton from "../../components/ColoredButton";
import useBeneficiary from "../../hooks/useBeneficiary";

const DonationStepThree = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { beneficiaries, getSelectedBeneficiaries } = useBeneficiary();

  useEffect(() => {
    // 잘못된 접근 처리
    if (!location.state || !location.state.fromSecondStep) {
      window.alert("잘못된 접근입니다. 홈으로 이동합니다.");
      navigate("/");
      return;
    }

    // 선택된 태그, 인원수, 1인당 수혜금액을 기반으로 수혜자 정보 가져오기
    getSelectedBeneficiaries(
      location.state.selectedTags,
      location.state.numberOfPeople,
      location.state.amountPerPerson
    );
  }, [location.state, navigate, getSelectedBeneficiaries]);

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
      <DonationStepsBar currentStep={3} />
      <div className="donation-step-three__beneficiaries">
        {beneficiaries.map((beneficiary) => (
          <BeneficiaryBox
            key={beneficiary.beneficiaryId}
            beneficiaryId={beneficiary.beneficiaryId}
            selectedTags={location.state.selectedTags}
          />
        ))}
      </div>
      <div className="donation-step-three__navigation">
        <ColoredButton
          text={"이전"}
          onClick={onBeforeButtonClicked}
          className={"donation-step-three__button"}
        />
        <ColoredButton
          text={"결제하기"}
          colorScheme={"orange"}
          onClick={onNextButtonClicked}
          className={"donation-step-three__button"}
        />
      </div>
    </div>
  );
};

export default DonationStepThree;
