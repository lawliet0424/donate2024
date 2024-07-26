import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ColoredButton from "../../components/ColoredButton";
import "./Signup.css";

const Signup = () => {
  const nav = useNavigate();

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupNickname, setSignupNickname] = useState("");
  const [signupId, setSignupId] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const onClickSignupButton = () => {
    // 회원가입 로직 추가
    nav("/login");
  };

  const onSignupNameChange = (event) => setSignupName(event.target.value);
  const onSignupEmailChange = (event) => setSignupEmail(event.target.value);
  const onSignupNicknameChange = (event) =>
    setSignupNickname(event.target.value);
  const onSignupIdChange = (event) => setSignupId(event.target.value);
  const onSignupPasswordChange = (event) =>
    setSignupPassword(event.target.value);

  return (
    <div className="Signup">
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
        placeholder="닉네임"
        value={signupNickname}
        onChange={onSignupNicknameChange}
      />
      <input
        placeholder="아이디"
        value={signupId}
        onChange={onSignupIdChange}
      />
      <input
        placeholder="비밀번호"
        value={signupPassword}
        onChange={onSignupPasswordChange}
        type="password"
      />
      <ColoredButton
        text="회원가입"
        type="Orange"
        onClick={onClickSignupButton}
      />
    </div>
  );
};

export default Signup;
