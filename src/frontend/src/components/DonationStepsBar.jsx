import "./DonationStepsBar.css";

const Step = ({ stepNumber, stepText, isActive }) => {
  return (
    <div className={`Step ${isActive ? "is-active" : ""}`}>
      <div className="step-number">{stepNumber}</div>
      <div className="step-text">{stepText}</div>
    </div>
  );
};

const DonationStepsBar = ({ currentStep }) => {
  return (
    <div className="DonationStepsBar">
      <Step stepNumber="01" stepText="태그 선택" isActive={currentStep === 1} />
      <Step
        stepNumber="02"
        stepText="수혜 인원, 기부 금액 입력"
        isActive={currentStep === 2}
      />
      <Step
        stepNumber="03"
        stepText="수혜자 확인"
        isActive={currentStep === 3}
      />
    </div>
  );
};

export default DonationStepsBar;
