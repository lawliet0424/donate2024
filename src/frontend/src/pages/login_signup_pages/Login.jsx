import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
      window.alert("아이디 또는 비밀번호를 잘못 입력했습니다.");
      console.error("Login failed", error);
    }
  };

  const onClickToSignupButton = () => {
    navigate("/signup/step1");
  };

  const onIdSearchingButtonClick = () => {
    // (선택) 아이디 찾기 로직
  };

  const onPwSearchingButtonClick = () => {
    // (선택) 비밀번호 찾기 로직
  };

  return (
    <div className="login">
      <div className="login__title">로그인</div>
      <input
        type="text"
        placeholder="아이디"
        value={loginId}
        onChange={(e) => setLoginId(e.target.value)}
        className="login__input"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
        className="login__input"
      />
      <ColoredButton
        text="로그인"
        colorScheme="orange"
        onClick={onClickLoginButton}
        className={"login__button--login"}
      />

      <div className="login__userAssistance">
        <TransparentButton
          text="아이디 찾기"
          onClick={onIdSearchingButtonClick}
        />
        <div className="login__userAssistance__divider">|</div>
        <TransparentButton
          text="비밀번호 찾기"
          onClick={onPwSearchingButtonClick}
        />
      </div>

      <div className="login__separator">
        <div className="login__separator__line"></div>
        <div className="login__separator__text">또는</div>
        <div className="login__separator__line"></div>
      </div>

      <ColoredButton
        text="회원가입"
        colorScheme="white"
        onClick={onClickToSignupButton}
        className={"login__button--signup"}
      />
    </div>
  );
};

export default Login;
