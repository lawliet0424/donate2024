import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ColoredButton from "../../components/ColoredButton";
import "./SignupFirstStep.css";

const SignupFirstStep = () => {
  const navigate = useNavigate();

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");

  const onNextButtonClicked = () => {
    navigate("/signup/second", { state: { fromSignupFirst: true, signupName, signupEmail } });
  };

  const onSignupNameChange = (event) => setSignupName(event.target.value);
  const onSignupEmailChange = (event) => setSignupEmail(event.target.value);

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
      <ColoredButton text="다음" type="Orange" onClick={onNextButtonClicked} />
    </div>
  );
};

export default SignupFirstStep;
