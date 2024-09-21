import "./DonationStepsBar.css";

/*
  Function name: Step
  Summary: 각 단계의 번호와 텍스트를 표시하는 컴포넌트
  Parameter: 총 3개
             string stepNumber; 단계 번호
             string stepText; 단계 설명 텍스트
            boolean isActive; 해당 단계가 활성화 상태인지 여부
  Return: 총 1개; 단계 정보를 포함한 JSX 컴포넌트
  Caller: DonationStepsBar
  Date: 2024.09.21
  Write by: 길정수
*/
const Step = ({ stepNumber, stepText, isActive }) => {
  /*
  JSX: 단계 번호와 설명 텍스트를 화면에 표시하는 컴포넌트 구조
  */
  return (
    <div className={`Step ${isActive ? "is-active" : ""}`}>
      <div className="step-number">{stepNumber}</div>
      <div className="step-text">{stepText}</div>
    </div>
  );
};

/*
  Function name: DonationStepsBar
  Summary: 기부 단계 진행 표시 바 컴포넌트
  Parameter: 총 1개
             number currentStep; 현재 활성화된 단계 번호
  Return: 총 1개; 기부 단계 진행 바를 포함한 JSX 컴포넌트
  Caller: 다른 기부 관련 컴포넌트에서 호출 가능
  Date: 2024.09.21
  Write by: 길정수
*/
const DonationStepsBar = ({ currentStep }) => {
  /*
    JSX: 각 단계를 화면에 렌더링하는 컴포넌트 구조
  */
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
