import React, { useState } from "react"; // React와 useState 훅 임포트
import { useNavigate } from "react-router-dom"; // useNavigate 훅 임포트
import useAuth from "../../hooks/useAuth"; // 사용자 인증 훅 임포트
import TransparentButton from "../../components/TransparentButton"; // 투명 버튼 컴포넌트 임포트
import ColoredButton from "../../components/ColoredButton"; // 색상 버튼 컴포넌트 임포트
import "./Login.css"; // CSS 파일 임포트

/*
Function name: Login
Summary: 로그인 화면을 구성하는 컴포넌트
Parameter: N/A
Return: 총 1개; 사용자 로그인 기능을 제공하는 컴포넌트
Caller: N/A
Date: 2024-09-22
Write by: 길정수
*/
const Login = () => {
  const [loginId, setLoginId] = useState(""); // 로그인 ID 상태
  const [loginPassword, setLoginPassword] = useState(""); // 로그인 비밀번호 상태
  const { login, error } = useAuth(); // 로그인 함수 가져오기
  const navigate = useNavigate(); // navigate 함수 초기화

  // 로그인 버튼 클릭 시 실행되는 함수
  const onClickLoginButton = async () => {
    try {
      await login(loginId, loginPassword); // 로그인 시도
      navigate("/"); // 로그인 성공 시 홈으로 이동
    } catch (error) {
      console.error("Login failed", error); // 콘솔에 오류 로그
    }
  };

  // 회원가입 버튼 클릭 시 실행되는 함수
  const onClickToSignupButton = () => {
    navigate("/signup/step1"); // 회원가입 페이지로 이동
  };

  // 아이디 찾기 버튼 클릭 시 실행되는 함수
  const onIdSearchingButtonClick = () => {
    // (선택) 아이디 찾기 로직
  };

  // 비밀번호 찾기 버튼 클릭 시 실행되는 함수
  const onPwSearchingButtonClick = () => {
    // (선택) 비밀번호 찾기 로직
  };

  return (
    <div className="login">
      <div className="login__title">로그인</div> {/* 로그인 제목 */}
      <input
        type="text"
        placeholder="아이디"
        value={loginId}
        onChange={(e) => setLoginId(e.target.value)} // 아이디 입력 변화 처리
        className="login__input"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)} // 비밀번호 입력 변화 처리
        className="login__input"
      />
      <ColoredButton
        text="로그인"
        colorScheme="orange"
        onClick={onClickLoginButton} // 로그인 버튼 클릭 시 이벤트 처리
        className={"login__button--login"}
      />
      <div className="login__userAssistance">
        <TransparentButton
          text="아이디 찾기"
          onClick={onIdSearchingButtonClick} // 아이디 찾기 버튼 클릭 시 이벤트 처리
        />
        <div className="login__userAssistance__divider">|</div>
        <TransparentButton
          text="비밀번호 찾기"
          onClick={onPwSearchingButtonClick} // 비밀번호 찾기 버튼 클릭 시 이벤트 처리
        />
      </div>
      <div className="login__separator">
        <div className="login__separator__line"></div> {/* 구분선 */}
        <div className="login__separator__text">또는</div> {/* 또는 텍스트 */}
        <div className="login__separator__line"></div> {/* 구분선 */}
      </div>
      <ColoredButton
        text="회원가입"
        colorScheme="white"
        onClick={onClickToSignupButton} // 회원가입 버튼 클릭 시 이벤트 처리
        className={"login__button--signup"}
      />
    </div>
  );
};

export default Login; // Login 컴포넌트 내보내기
