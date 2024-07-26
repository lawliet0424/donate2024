import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ColoredButton from "../../components/ColoredButton";
import TransparentButton from "../../components/TransparentButton";
import "./Login.css";

const Login = () => {
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const { login } = useAuth(); // AuthContext에서 login 함수를 가져옵니다.
  const nav = useNavigate();

  const onClickLoginButton = () => {
    // 로그인 로직 (예: 서버와의 통신)
    // 로그인 성공 시 인증 상태를 업데이트하고 홈 페이지로 이동합니다.
    login(); // 인증 상태를 true로 변경합니다.
    window.alert("로그인"); // 로그인 성공 알림 표시
    nav("/", { replace: true }); // 홈 페이지로 리디렉션합니다.
  };

  const onClickToSignupButton = () => {
    nav("/signup");
  };

  const onIdSearchingButtonClick = () => {
    // 아이디 찾기 로직
  };

  const onPwSearchingButtonClick = () => {
    // 비밀번호 찾기 로직
  };

  return (
    <div className="Login">
      <div className="title">로그인</div>
      <input
        type="text" // type을 text로 변경합니다.
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
      <ColoredButton
        text="회원가입"
        type="White"
        onClick={onClickToSignupButton}
      />
    </div>
  );
};

export default Login;
