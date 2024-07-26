import ColoredButton from "../../components/ColoredButton";
import DonationStepsBar from "../../components/DonationStepsBar";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BeneficiaryBox from "../../components/BeneficiaryBox";
import profileImage from "../../assets/basicProfile.png";
import "./DonationThirdStep.css";

const DonationThirdStep = () => {
  const location = useLocation();
  const nav = useNavigate();

  if (!location.state || !location.state.fromSecondStep) {
    console.warn("No state or incorrect state from previous step");
    nav("/", { replace: true });
    return null;
  }

  const onNextButtonClicked = () => {
    nav("/donation/payment", { state: { fromThirdStep: true } });
  };

  const onBeforeButtonClicked = () => {
    nav("/donation/second", { state: { fromThirdStep: true } });
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
        <BeneficiaryBox
          profileImage={profileImage}
          name={"이름"}
          tags={["태그1", "태그2"]}
          id={3}
        />
        <BeneficiaryBox
          profileImage={profileImage}
          name={"이름"}
          tags={["태그1", "태그2"]}
          id={3}
        />
        <BeneficiaryBox
          profileImage={profileImage}
          name={"이름"}
          tags={["태그1", "태그2"]}
          id={3}
        />
        <BeneficiaryBox
          profileImage={profileImage}
          name={"이름"}
          tags={["태그1", "태그2"]}
          id={3}
        />
        <BeneficiaryBox
          profileImage={profileImage}
          name={"이름"}
          tags={["태그1", "태그2"]}
          id={3}
        />
      </div>
      <div className="pageNavigationButtons">
        <ColoredButton text={"이전"} onClick={onBeforeButtonClicked} />
        <ColoredButton
          text={"결제하기"}
          type={"Orange"}
          onClick={onNextButtonClicked}
        />
      </div>
    </div>
  );
};

export default DonationThirdStep;
