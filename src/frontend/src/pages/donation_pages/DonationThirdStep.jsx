import "./DonationThirdStep.css";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DonationStepsBar from "../../components/DonationStepsBar";
import BeneficiaryBox from "../../components/BeneficiaryBox";
import ColoredButton from "../../components/ColoredButton";

const DonationThirdStep = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const chosenBeneficiaries = [1, 2, 3];

  useEffect(() => {
    if (!location.state || !location.state.fromSecondStep) {
      window.alert("잘못된 접근입니다. 홈으로 이동합니다.");
      navigate("/");
      return;
    }
  }, [location.state, navigate]);

  const onNextButtonClicked = () => {
    navigate("/donation/payment", {
      state: {
        fromThirdStep: true,
        selectedTags: location.state.selectedTags,
        personnel: location.state.personnel,
        amount: location.state.amount,
        perPerson: location.state.perPerson,
      },
    });
  };

  const onBeforeButtonClicked = () => {
    navigate("/donation/second", {
      state: {
        fromThirdStep: true,
        selectedTags: location.state.selectedTags,
        personnel: location.state.personnel,
        amount: location.state.amount,
      },
    });
  };

  return (
    <div className="DonationThirdStep">
      <DonationStepsBar stepNow={3} />
      <div className="beneficiaryLists">
        {chosenBeneficiaries.map((beneficiaryId) => (
          <BeneficiaryBox
            key={beneficiaryId}
            beneficiaryId={beneficiaryId}
            selectedTags={location.state.selectedTags}
          />
        ))}
      </div>
      <div className="pageNavigationButtons">
        <ColoredButton text={"이전"} onClick={onBeforeButtonClicked} />
        <ColoredButton
          text={"결제하기"}
          colorScheme={"orange"}
          onClick={onNextButtonClicked}
        />
      </div>
    </div>
  );
};

export default DonationThirdStep;
