import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import TransparentButton from "../../components/TransparentButton";
import ColoredButton from "../../components/ColoredButton";
import "./Login.css";

const Login = () => {
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const onClickLoginButton = async () => {
    try {
      await login(loginId, loginPassword);
      navigate("/");
    } catch (error) {
      window.alert("오류");
      console.error("Login failed", error);
    }
  };

  const onClickToSignupButton = () => {
    navigate("/signup");
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
      <ColoredButton
        text="로그인"
        colorScheme="Orange"
        onClick={onClickLoginButton}
      />

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
        colorScheme="White"
        onClick={onClickToSignupButton}
        className="ColoredButton_White"
      />
    </div>
  );
};

export default Login;
