import "./DonationStepThree.css";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DonationStepsBar from "../../components/DonationStepsBar";
import BeneficiaryBox from "../../components/BeneficiaryBox";
import ColoredButton from "../../components/ColoredButton";
import useInterest from "../../hooks/useInterest";

const DonationStepThree = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getUserInterests } = useInterest();

  const chosenBeneficiaries = [1, 2, 3];

  useEffect(() => {
    // 유저의 관심사 가져오기
    getUserInterests();

    // 잘못된 접근 처리
    if (!location.state || !location.state.fromSecondStep) {
      window.alert("잘못된 접근입니다. 홈으로 이동합니다.");
      navigate("/");
      return;
    }
  }, [getUserInterests, location.state, navigate]);

  const onNextButtonClicked = () => {
    navigate("/donation/payment", {
      state: {
        fromThirdStep: true,
        selectedTags: location.state.selectedTags,
        numberOfPeople: location.state.numberOfPeople,
        amount: location.state.amount,
        amountPerPerson: location.state.amountPerPerson,
        beneficiaryList: chosenBeneficiaries,
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
        {chosenBeneficiaries.map((beneficiaryId) => (
          <BeneficiaryBox
            key={beneficiaryId}
            beneficiaryId={beneficiaryId}
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
