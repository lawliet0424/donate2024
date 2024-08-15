import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ColoredButton from "../../components/ColoredButton";
import TransparentButton from "../../components/TransparentButton";
import "./Login.css";

const Login = () => {
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  const onClickLoginButton = () => {
    // id, pw 확인 절차 추가
    console.log("아이디:", loginId);
    console.log("비밀번호:", loginPassword);
    login();
    window.alert("로그인");
    nav("/", { replace: true });
  };

  const onClickToSignupButton = () => {
    nav("/signup");
  };

  const onIdSearchingButtonClick = () => {
    // (선택) 아이디 찾기 로직
  };

  const onPwSearchingButtonClick = () => {
    // (선택) 비밀번호 찾기 로직
  };

  return (
    <div className="Login">
      <div className="title">로그인</div>
      <input
        type="text"
        placeholder="아이디"
        value={loginId}
        onChange={(e) => setLoginId(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
      />
      <ColoredButton text="로그인" type="Orange" onClick={onClickLoginButton} />

      <div className="userAssistance">
        <TransparentButton
          text="아이디 찾기"
          onClick={onIdSearchingButtonClick}
        />
        <div className="divider">|</div>
        <TransparentButton
          text="비밀번호 찾기"
          onClick={onPwSearchingButtonClick}
        />
      </div>

      <div className="separator">
        <div className="line"></div>
        <div className="text">또는</div>
        <div className="line"></div>
      </div>

      <ColoredButton
        text="회원가입"
        type="White"
        onClick={onClickToSignupButton}
        className="ColoredButton_White"
      />
    </div>
  );
};

export default Login;
