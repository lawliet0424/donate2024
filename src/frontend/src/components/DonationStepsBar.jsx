import "./DonationStepsBar.css";

const DonationSteps = ({ num, text, isNow }) => {
  return (
    <div className={`DonationSteps ${isNow ? "is-active" : ""}`}>
      <div className="num">{num}</div>
      <div className="text">{text}</div>
    </div>
  );
};

const DonationStepsBar = ({ stepNow }) => {
  return (
    <div className="DonationStepsBar">
      <DonationSteps num="01" text="태그 선택" isNow={stepNow === 1} />
      <DonationSteps
        num="02"
        text="수혜 인원, 기부 금액 입력"
        isNow={stepNow === 2}
      />
      <DonationSteps num="03" text="수혜자 확인" isNow={stepNow === 3} />
    </div>
  );
};

export default DonationStepsBar;
