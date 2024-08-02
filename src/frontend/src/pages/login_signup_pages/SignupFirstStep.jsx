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

  return (
    <div className="SignupFirstStep">
      <div className="title">회원가입</div>
      <input
        type="text"
        placeholder="이름"
        value={signupName}
        onChange={(e) => setSignupName(e.target.value)}
      />
      <input
        type="email"
        placeholder="이메일"
        value={signupEmail}
        onChange={(e) => setSignupEmail(e.target.value)}
      />
      <input
        type="tel"
        placeholder="전화번호"
        value={signupPhoneNumber}
        onChange={(e) => setSignupPhoneNumber(e.target.value)}
      />
      <ColoredButton text="다음" colorScheme="Orange" onClick={onNextButtonClicked} />

      <div className="separator">
        <div className="line"></div>
        <div className="text">또는</div>
        <div className="line"></div>
      </div>

      <ColoredButton
        text="로그인"
        colorScheme="White"
        onClick={onClickToSignupButton}
        className="ColoredButton_White"
      />
    </div>
  );
};

export default SignupFirstStep;
