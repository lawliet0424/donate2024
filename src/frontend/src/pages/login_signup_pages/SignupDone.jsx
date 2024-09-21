import "./SignupDone.css"; // CSS 파일 임포트
import React, { useEffect } from "react"; // React와 useEffect 훅 임포트
import { useNavigate, useLocation } from "react-router-dom"; // useNavigate와 useLocation 훅 임포트
import checkMark from "../../assets/checkMark.png"; // 체크마크 이미지 임포트
import ColoredButton from "../../components/ColoredButton"; // 색상 버튼 컴포넌트 임포트

/*
Function name: SignupDone
Summary: 회원가입 완료 화면을 구성하는 컴포넌트
Parameter: N/A
Return: 총 1개; 회원가입 완료 메시지를 보여주는 컴포넌트
Caller: N/A
Date: 2024-09-22
Write by: 길정수
*/
const SignupDone = () => {
  const navigate = useNavigate(); // navigate 함수 초기화
  const location = useLocation(); // 현재 위치 정보 가져오기

  useEffect(() => {
    // 회원가입 두 번째 단계에서 온 경우가 아닐 때 처리
    if (!location.state?.fromSignupSecond) {
      window.alert("잘못된 접근입니다. 홈으로 이동합니다."); // 오류 메시지 표시
      navigate("/"); // 홈으로 이동
    }
  }, [location.state, navigate]);

  // 로그인 버튼 클릭 시 실행되는 함수
  const onLoginButtonClicked = () => {
    navigate("/login"); // 로그인 페이지로 이동
  };

  // 메인 버튼 클릭 시 실행되는 함수
  const onHomeButtonClicked = () => {
    navigate("/"); // 홈으로 이동
  };

  return (
    <div className="signup-done">
      <img className="signup-done__checkMark" src={checkMark} alt="checkMark" />{" "}
      {/* 체크마크 이미지 */}
      <div className="signup-done__title">회원가입이 완료되었습니다!</div>{" "}
      {/* 완료 메시지 제목 */}
      <div className="signup-done__text">
        로그인 후 모든 서비스를 이용할 수 있습니다. {/* 안내 메시지 */}
      </div>
      <div className="signup-done__navigation">
        <ColoredButton
          text={"메인"}
          onClick={onHomeButtonClicked} // 메인 버튼 클릭 시 이벤트 처리
          className={"signup-done__button"}
        />
        <ColoredButton
          text={"로그인"}
          colorScheme={"orange"}
          onClick={onLoginButtonClicked} // 로그인 버튼 클릭 시 이벤트 처리
          className={"signup-done__button"}
        />
      </div>
    </div>
  );
};

export default SignupDone; // SignupDone 컴포넌트 내보내기
