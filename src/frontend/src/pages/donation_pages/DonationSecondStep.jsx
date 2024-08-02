import ColoredButton from "../../components/ColoredButton";
import DonationStepsBar from "../../components/DonationStepsBar";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./DonationSecondStep.css";

const DonationSecondStep = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [personnel, setPersonnel] = useState("");
  const [amount, setAmount] = useState("");

  // Check if the state includes the expected values
  if (
    !location.state ||
    (!location.state.fromFirstStep && !location.state.fromThirdStep)
  ) {
    window.alert("잘못된 접근입니다. 홈으로 이동합니다.");
    navigate("/");
    return null;
  }

  const perPerson = personnel && amount ? amount / personnel : 0;

  const formatPerPerson = (value) => {
    if (value % 1 === 0) {
      return value;
    }
    return value.toFixed(2).replace(/\.?0+$/, "");
  };

  const onNextButtonClicked = () => {
    // Ensure both personnel and amount are greater than 0
    if (personnel < 1 || amount < 1) {
      window.alert("모든 필드는 1 이상의 값을 입력해 주세요.");
      return;
    }
    navigate("/donation/third", { state: { fromSecondStep: true } });
  };

  const onBeforeButtonClicked = () => {
    navigate("/donation", { state: { fromSecondStep: true } });
  };

  return (
    <div className="DonationSecondStep">
      <DonationStepsBar stepNow={2} />
      <div className="DonationSecondStepText">
        <input
          className="personnel"
          type="number"
          min="1" // Set minimum value to 1
          value={personnel}
          onChange={(e) => setPersonnel(Number(e.target.value))}
        />
        <div>명에게</div>
        <input
          className="amount"
          type="number"
          min="1" // Set minimum value to 1
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <div>원을 나눠 기부합니다.</div>
      </div>
      <div className="explanation">
        {personnel > 0 && amount > 0
          ? `한 명당 <${formatPerPerson(perPerson)}원>씩 기부됩니다`
          : "한 명당 ___________원씩 기부됩니다"}
      </div>

      <div className="pageNavigationButtons">
        <ColoredButton text={"이전"} onClick={onBeforeButtonClicked} />
        <ColoredButton
          text={"다음"}
          colorScheme={"Orange"}
          onClick={onNextButtonClicked}
        />
      </div>
    </div>
  );
};

export default DonationSecondStep;
