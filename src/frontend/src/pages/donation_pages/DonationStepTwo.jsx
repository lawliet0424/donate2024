import "./DonationStepTwo.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DonationStepsBar from "../../components/DonationStepsBar";
import ColoredButton from "../../components/ColoredButton";
import {
  formatamountPerPerson,
  validateNumberOfPeopleAmount,
} from "../../utils/FormatValidate";

const DonationStepTwo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const { fromFirstStep, fromThirdStep } = location.state || {};

    if (!fromFirstStep && !fromThirdStep) {
      window.alert("잘못된 접근입니다. 홈으로 이동합니다.");
      navigate("/");
      return;
    }

    const { numberOfPeople: savedNumberOfPeople, amount: savedAmount } =
      location.state;
    setNumberOfPeople(savedNumberOfPeople);
    setAmount(savedAmount);
  }, [location.state, navigate]);

  const amountPerPerson =
    numberOfPeople && amount ? amount / numberOfPeople : 0;

  const onNextButtonClicked = () => {
    const errorMessage = validateNumberOfPeopleAmount(
      numberOfPeople,
      amount,
      amountPerPerson
    );
    if (errorMessage) {
      validateNumberOfPeopleAmount;
      window.alert(errorMessage);
      return;
    }
    navigate("/donation/step3", {
      state: {
        fromSecondStep: true,
        selectedTags: location.state.selectedTags,
        numberOfPeople: numberOfPeople,
        amount: amount,
        amountPerPerson: formatamountPerPerson(amountPerPerson),
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
      <DonationStepsBar currentStep={2} />
      <div className="donation-step-two__text">
        <input
          className="donation-step-two__input--numberOfPeople"
          type="number"
          min="1"
          value={numberOfPeople || ""}
          onChange={(e) => setNumberOfPeople(Number(e.target.value))}
        />
        <div>명에게</div>
        <input
          className="donation-step-two__input--amount"
          type="number"
          min="1,000"
          value={amount || ""}
          onChange={(e) => setAmount(Number(e.target.value))}
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
          text={"이전"}
          onClick={onBeforeButtonClicked}
          className={"donation-step-two__button"}
        />
        <ColoredButton
          text={"다음"}
          colorScheme={"orange"}
          onClick={onNextButtonClicked}
          className={"donation-step-two__button"}
        />
      </div>
    </div>
  );
};

export default DonationStepTwo;
