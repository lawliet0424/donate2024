import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ColoredButton from "../../components/ColoredButton";
import "./SignupFirstStep.css";

const SignupFirstStep = () => {
  const navigate = useNavigate();

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhoneNumber, setSignupPhoneNumber] = useState("");

  const onNextButtonClicked = () => {
    navigate("/signup/second", {
      state: {
        fromSignupFirst: true,
        signupName,
        signupEmail,
        signupPhoneNumber,
      },
    });
  };

  const onClickToSignupButton = () => {
    navigate("/login");
  };

  const onSignupNameChange = (event) => setSignupName(event.target.value);
  const onSignupEmailChange = (event) => setSignupEmail(event.target.value);
  const onSignupPhoneNumberChange = (event) =>
    setSignupPhoneNumber(event.target.value);

  return (
    <div className="SignupFirstStep">
      <div className="title">회원가입</div>
      <input
        placeholder="이름"
        value={signupName}
        onChange={onSignupNameChange}
      />
      <input
        placeholder="이메일"
        value={signupEmail}
        onChange={onSignupEmailChange}
      />
      <input
        placeholder="전화번호"
        value={signupPhoneNumber}
        onChange={onSignupPhoneNumberChange}
      />
      <ColoredButton text="다음" type="Orange" onClick={onNextButtonClicked} />

      <div className="separator">
        <div className="line"></div>
        <div className="text">또는</div>
        <div className="line"></div>
      </div>

      <ColoredButton
        text="로그인"
        type="White"
        onClick={onClickToSignupButton}
        className="ColoredButton_White"
      />
    </div>
  );
};

export default SignupFirstStep;
