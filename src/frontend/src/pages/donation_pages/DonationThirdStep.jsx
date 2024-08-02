import ColoredButton from "../../components/ColoredButton";
import DonationStepsBar from "../../components/DonationStepsBar";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BeneficiaryBox from "../../components/BeneficiaryBox";
import profileImage from "../../assets/basicProfile.png";
import "./DonationThirdStep.css";

const DonationThirdStep = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state || !location.state.fromSecondStep) {
    window.alert("잘못된 접근입니다. 홈으로 이동합니다.");
    navigate("/");
    return null;
  }

  const onNextButtonClicked = () => {
    navigate("/donation/payment", { state: { fromThirdStep: true } });
  };

  const onBeforeButtonClicked = () => {
    navigate("/donation/second", { state: { fromThirdStep: true } });
  };

  return (
    <div className="DonationThirdStep">
      <DonationStepsBar stepNow={3} />
      <div className="beneficiaryLists">
        <BeneficiaryBox
          profileImage={profileImage}
          name={"이름"}
          tags={["태그1", "태그2"]}
          id={3}
        />
        {/* 필요한 만큼 BeneficiaryBox 컴포넌트를 추가 */}
      </div>
      <div className="pageNavigationButtons">
        <ColoredButton text={"이전"} onClick={onBeforeButtonClicked} />
        <ColoredButton
          text={"결제하기"}
          colorScheme={"Orange"}
          onClick={onNextButtonClicked}
        />
      </div>
    </div>
  );
};

export default DonationThirdStep;
