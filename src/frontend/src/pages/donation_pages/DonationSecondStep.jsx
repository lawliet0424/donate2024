import "./DonationSecondStep.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DonationStepsBar from "../../components/DonationStepsBar";
import ColoredButton from "../../components/ColoredButton";
import {
  formatPerPerson,
  validatePersonnelAmount,
} from "../../utils/FormatValidate";

const DonationSecondStep = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [personnel, setPersonnel] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const { fromFirstStep, fromThirdStep } = location.state || {};

    if (!fromFirstStep && !fromThirdStep) {
      window.alert("잘못된 접근입니다. 홈으로 이동합니다.");
      navigate("/");
      return;
    }

    const { personnel: savedPersonnel, amount: savedAmount } = location.state;
    setPersonnel(savedPersonnel);
    setAmount(savedAmount);
  }, [location.state, navigate]);

  const perPerson = personnel && amount ? amount / personnel : 0;

  const onNextButtonClicked = () => {
    const errorMessage = validatePersonnelAmount(personnel, amount, perPerson);
    if (errorMessage) {
      window.alert(errorMessage);
      return;
    }
    navigate("/donation/step3", {
      state: {
        fromSecondStep: true,
        selectedTags: location.state.selectedTags,
        personnel: personnel,
        amount: amount,
        perPerson: formatPerPerson(perPerson),
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
    <div className="DonationSecondStep">
      <DonationStepsBar stepNow={2} />
      <div className="DonationSecondStepText">
        <input
          className="personnel"
          type="number"
          min="1"
          value={personnel}
          onChange={(e) => setPersonnel(Number(e.target.value))}
        />
        <div>명에게</div>
        <input
          className="amount"
          type="number"
          min="1,000"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <div>원을 나눠 기부합니다.</div>
      </div>
      <div className="amountResult">
        {personnel > 0 && amount > 0 ? (
          <>
            수혜자 한 명당{" "}
            <span className="perPersonAmount">
              {formatPerPerson(perPerson).toLocaleString()}원
            </span>{" "}
            기부됩니다
          </>
        ) : (
          "수혜자 한 명당 1,000원 이상 기부되도록 입력해주세요."
        )}
      </div>
      <div className="explanation">
        *소수점 이하 금액은 블록체인 수수료로 사용됩니다.
      </div>

      <div className="pageNavigationButtons">
        <ColoredButton text={"이전"} onClick={onBeforeButtonClicked} />
        <ColoredButton
          text={"다음"}
          colorScheme={"orange"}
          onClick={onNextButtonClicked}
        />
      </div>
    </div>
  );
};

export default DonationSecondStep;
