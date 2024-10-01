import React, { useState, useEffect } from "react"; // React와 관련 훅 임포트
import { useNavigate, useLocation } from "react-router-dom"; // useNavigate와 useLocation 훅 임포트
import ColoredButton from "../../components/ColoredButton"; // 색상 버튼 컴포넌트 임포트
import "./SignupStepOne.css"; // CSS 파일 임포트
import {
  formatPhoneNumber,
  validateName,
  validateEmail,
  validatePhoneNumber,
} from "../../utils/FormatValidate"; // 유틸리티 함수 임포트
import useAuth from "../../hooks/useAuth"; // 인증 관련 훅 임포트

/*
Function name: SignupStepOne
Summary: 회원가입 첫 번째 단계 컴포넌트
Parameter: N/A
Return: 총 1개; 사용자 정보를 입력받는 폼을 포함한 컴포넌트
Caller: N/A
Date: 2024-09-22
Write by: 길정수
*/
const SignupStepOne = () => {
  const navigate = useNavigate(); // navigate 함수 초기화
  const location = useLocation(); // 현재 위치 정보 가져오기
  const { signupFirstPage } = useAuth(); // 인증 관련 기능 가져오기

  // 상태 관리
  const [signupName, setSignupName] = useState(""); // 이름 상태
  const [signupEmail, setSignupEmail] = useState(""); // 이메일 상태
  const [signupPhoneNumber, setSignupPhoneNumber] = useState(""); // 전화번호 상태
  const [errors, setErrors] = useState({
    // 에러 상태
    name: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    // 이전 단계에서 전달된 상태가 있는 경우 처리
    if (location.state) {
      const {
        signupName: savedSignupName,
        signupEmail: savedSignupEmail,
        signupPhoneNumber: savedSignupPhoneNumber,
      } = location.state;

      setSignupName(savedSignupName || ""); // 이름 설정
      setSignupEmail(savedSignupEmail || ""); // 이메일 설정
      setSignupPhoneNumber(formatPhoneNumber(savedSignupPhoneNumber || "")); // 전화번호 포맷 설정
    }
  }, [location.state]);

  /*
  Function name: handleNameChange
  Summary: 이름 입력 변경 처리 함수
  Parameter: 총 1개
             Event e; 입력 이벤트
  Return: N/A
  Caller: onChange
  Date: 2024-09-22
  Write by: 길정수
  */
  const handleNameChange = (e) => {
    const newName = e.target.value; // 새로운 이름 값
    setSignupName(newName); // 이름 상태 업데이트
    setErrors((prevErrors) => ({
      ...prevErrors,
      name: validateName(newName), // 이름 유효성 검사
    }));
  };

  /*
  Function name: handlePhoneNumberChange
  Summary: 전화번호 입력 변경 처리 함수
  Parameter: 총 1개
             Event e; 입력 이벤트
  Return: N/A
  Caller: onChange
  Date: 2024-09-22
  Write by: 길정수
  */
  const handlePhoneNumberChange = (e) => {
    const formattedInput = e.target.value; // 입력된 전화번호
    const numbersOnly = formattedInput.replace(/\D/g, ""); // 숫자만 추출

    setSignupPhoneNumber(numbersOnly); // 전화번호 상태 업데이트
    setErrors((prevErrors) => ({
      ...prevErrors,
      phoneNumber: validatePhoneNumber(formattedInput), // 전화번호 유효성 검사
    }));
  };

  /*
  Function name: handleEmailChange
  Summary: 이메일 입력 변경 처리 함수
  Parameter: 총 1개
             Event e; 입력 이벤트
  Return: N/A
  Caller: onChange
  Date: 2024-09-22
  Write by: 길정수
  */
  const handleEmailChange = (e) => {
    const newEmail = e.target.value; // 새로운 이메일 값
    setSignupEmail(newEmail); // 이메일 상태 업데이트
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: validateEmail(newEmail), // 이메일 유효성 검사
    }));
  };

  /*
  Function name: onNextButtonClicked
  Summary: 다음 버튼 클릭 시 실행되는 함수
  Parameter: N/A
  Return: N/A
  Caller: onClick
  Date: 2024-09-22
  Write by: 길정수
  */
  const onNextButtonClicked = async () => {
    const nameValidationError = validateName(signupName); // 이름 유효성 검사
    const emailValidationError = validateEmail(signupEmail); // 이메일 유효성 검사
    const phoneNumberValidationError = validatePhoneNumber(
      formatPhoneNumber(signupPhoneNumber) // 전화번호 유효성 검사
    );

    // 에러가 있는 경우 상태 업데이트
    if (
      nameValidationError ||
      emailValidationError ||
      phoneNumberValidationError
    ) {
      setErrors({
        name: nameValidationError,
        email: emailValidationError,
        phoneNumber: phoneNumberValidationError,
      });
      return; // 에러가 있을 경우 함수 종료
    }

    const numbersOnly = signupPhoneNumber.replace(/\D/g, ""); // 숫자만 추출

    navigate("/signup/step2", {
      state: {
        fromSignupFirst: true,
        signupName: signupName,
        signupEmail: signupEmail,
        signupPhoneNumber: numbersOnly, // 다음 단계로 전달할 전화번호
      },
    });

    try {
      await signupFirstPage(signupName, signupEmail, numbersOnly);
      navigate("/signup/done", {
        state: {
          fromSignupSecond: true,
        },
      });
    } catch (error) {
      window.alert("오류가 발생하였습니다.");
      navigate("/error"); // 오류 페이지로 이동
      console.error("Signup failed", error);
    }
  };

  /*
  Function name: onClickToSignupButton
  Summary: 로그인 버튼 클릭 시 실행되는 함수
  Parameter: N/A
  Return: N/A
  Caller: onClick
  Date: 2024-09-22
  Write by: 길정수
  */
  const onClickToSignupButton = () => {
    navigate("/login"); // 로그인 페이지로 이동
  };

  return (
    <div className="signup-step-one">
      <div className="signup-step-one__title">회원가입</div>
      <input
        type="text"
        placeholder="이름"
        value={signupName}
        onChange={handleNameChange} // 이름 변경 시 이벤트 처리
        className={`signup-step-one__input${errors.name ? "--invalid" : ""}`} // 에러 여부에 따른 클래스 적용
      />
      {errors.name && (
        <div className="signup-step-one__message--error">{errors.name}</div> // 이름 에러 메시지
      )}
      <input
        type="email"
        placeholder="메일"
        value={signupEmail}
        onChange={handleEmailChange} // 이메일 변경 시 이벤트 처리
        className={`signup-step-one__input${errors.email ? "--invalid" : ""}`} // 에러 여부에 따른 클래스 적용
      />
      {errors.email && (
        <div className="signup-step-one__message--error">{errors.email}</div> // 이메일 에러 메시지
      )}
      <input
        type="tel"
        placeholder="전화번호"
        value={formatPhoneNumber(signupPhoneNumber)} // 포맷된 전화번호
        onChange={handlePhoneNumberChange} // 전화번호 변경 시 이벤트 처리
        maxLength={13} // 최대 길이 설정
        className={`signup-step-one__input${
          errors.phoneNumber ? "--invalid" : ""
        }`} // 에러 여부에 따른 클래스 적용
      />
      {errors.phoneNumber && (
        <div className="signup-step-one__message--error">
          {errors.phoneNumber} {/* 전화번호 에러 메시지 */}
        </div>
      )}
      <ColoredButton
        text="다음"
        colorScheme="orange"
        onClick={onNextButtonClicked} // 다음 버튼 클릭 시 이벤트 처리
        className={"signup-step-one__button--next"}
      />

      <div className="signup-step-one__separator">
        <div className="signup-step-one__separator__line"></div>
        <div className="signup-step-one__separator__text">또는</div>
        <div className="signup-step-one__separator__line"></div>
      </div>

      <ColoredButton
        text="로그인"
        colorScheme="white"
        onClick={onClickToSignupButton} // 로그인 버튼 클릭 시 이벤트 처리
        className={"signup-step-one__button--login"}
      />
    </div>
  );
};

export default SignupStepOne; // SignupStepOne 컴포넌트 내보내기