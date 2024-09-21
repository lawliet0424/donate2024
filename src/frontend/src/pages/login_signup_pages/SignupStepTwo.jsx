import "./SignupStepTwo.css"; // CSS 파일 임포트
import React, { useState, useEffect } from "react"; // React와 관련 훅 임포트
import { useNavigate, useLocation } from "react-router-dom"; // useNavigate와 useLocation 훅 임포트
import ColoredButton from "../../components/ColoredButton"; // 색상 버튼 컴포넌트 임포트
import {
  validateNickname,
  validateId,
  validatePassword,
} from "../../utils/FormatValidate"; // 유틸리티 함수 임포트
import useAuth from "../../hooks/useAuth"; // 인증 관련 훅 임포트

/*
Function name: SignupStepTwo
Summary: 회원가입 두 번째 단계 컴포넌트
Parameter: N/A
Return: 총 1개; 사용자 정보를 입력받는 폼을 포함한 컴포넌트
Caller: N/A
Date: 2024-09-22
Write by: 길정수
*/
const SignupStepTwo = () => {
  const navigate = useNavigate(); // navigate 함수 초기화
  const location = useLocation(); // 현재 위치 정보 가져오기
  const { signup, checkIdDuplicate } = useAuth(); // 인증 관련 기능 가져오기

  // 상태 관리
  const [signupNickname, setSignupNickname] = useState(""); // 닉네임 상태
  const [signupId, setSignupId] = useState(""); // 아이디 상태
  const [signupPassword, setSignupPassword] = useState(""); // 비밀번호 상태
  const [errors, setErrors] = useState({
    // 에러 상태
    nickname: "",
    id: "",
    password: "",
  });
  const [isIdDuplicate, setIsIdDuplicate] = useState(null); // 중복 아이디 확인 상태

  useEffect(() => {
    // 이전 단계에서 전달된 상태가 있는지 확인
    if (!location.state?.fromSignupFirst) {
      window.alert("잘못된 접근입니다. 홈으로 이동합니다.");
      navigate("/"); // 홈으로 이동
    }
  }, [location.state, navigate]);

  const { signupName, signupEmail, signupPhoneNumber } = location.state || {}; // 이전 단계의 상태 가져오기

  // 닉네임 변경 처리 함수
  const handleNicknameChange = (e) => {
    const newNickname = e.target.value;
    setSignupNickname(newNickname);
    setErrors((prevErrors) => ({
      ...prevErrors,
      nickname: validateNickname(newNickname),
    }));
  };

  // 아이디 변경 처리 함수
  const handleIdChange = (e) => {
    const newId = e.target.value;
    setSignupId(newId);
    setErrors((prevErrors) => ({
      ...prevErrors,
      id: validateId(newId),
    }));
  };

  // 비밀번호 변경 처리 함수
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setSignupPassword(newPassword);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: validatePassword(newPassword, signupId),
    }));
  };

  /*
  Function name: onDuplicateCheckButtonClicked
  Summary: 아이디 중복 확인 버튼 클릭 시 실행되는 함수
  Parameter: N/A
  Return: N/A
  Caller: 아이디 중복 확인 버튼
  Date: 2024-09-22
  Write by: 길정수
  */
  const onDuplicateCheckButtonClicked = async () => {
    const idError = validateId(signupId);
    if (idError) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        id: idError,
      }));
      return; // ID 형식 오류 시 중복 확인하지 않음
    }

    try {
      const isDuplicate = await checkIdDuplicate(signupId);
      if (isDuplicate) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          id: "이미 사용 중인 아이디입니다.",
        }));
      } else {
        setIsIdDuplicate(false);
        alert("사용 가능한 아이디입니다.");
      }
    } catch (error) {
      console.error("아이디 중복 확인 실패:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        id: "아이디 중복 확인에 실패했습니다.",
      }));
    }
  };

  /*
  Function name: onCompleteButtonClicked
  Summary: 완료 버튼 클릭 시 실행되는 함수
  Parameter: N/A
  Return: N/A
  Caller: 완료 버튼
  Date: 2024-09-22
  Write by: 길정수
  */
  const onCompleteButtonClicked = async () => {
    const nicknameError = validateNickname(signupNickname);
    const idError = validateId(signupId);
    const passwordError = validatePassword(signupPassword, signupId);

    if (nicknameError || idError || passwordError) {
      setErrors({
        nickname: nicknameError,
        id: idError,
        password: passwordError,
      });
      window.alert("모든 필드를 올바르게 입력해주세요.");
      return;
    }

    if (isIdDuplicate === null) {
      window.alert("아이디 중복 확인을 먼저 해주세요.");
      return;
    }

    if (isIdDuplicate) {
      window.alert("중복 확인에 실패했습니다.");
      return;
    }

    try {
      await signup(
        signupName,
        signupEmail,
        signupPhoneNumber,
        signupNickname,
        signupId,
        signupPassword
      );
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
  Function name: onBeforeButtonClicked
  Summary: 이전 버튼 클릭 시 실행되는 함수
  Parameter: N/A
  Return: N/A
  Caller: 이전 버튼
  Date: 2024-09-22
  Write by: 길정수
  */
  const onBeforeButtonClicked = () => {
    navigate("/signup/step1", {
      state: {
        signupName: location.state.signupName,
        signupEmail: location.state.signupEmail,
        signupPhoneNumber: location.state.signupPhoneNumber,
      },
    });
  };

  return (
    <div className="signup-step-two">
      <div className="signup-step-two__title">회원가입</div>

      <input
        type="text"
        placeholder="닉네임"
        className={`signup-step-two__input${
          errors.nickname ? "--invalid" : ""
        }`}
        value={signupNickname}
        onChange={handleNicknameChange}
      />
      {errors.nickname && (
        <div className="signup-step-two__message--error">{errors.nickname}</div>
      )}
      {!errors.nickname && (
        <div className="signup-step-two__message--default">
          {"한글 또는 영문(대소문자)으로만 2~5자"}
        </div>
      )}

      <div className="signup-step-two__id-row">
        <input
          type="text"
          placeholder="아이디"
          className={`signup-step-two__id${errors.id ? "--invalid" : ""}`}
          value={signupId}
          onChange={handleIdChange}
        />
        <ColoredButton
          text={"중복 확인"}
          colorScheme={"orange"}
          onClick={onDuplicateCheckButtonClicked}
          className={"signup-step-two__btn--duplicate"}
        />
      </div>

      {errors.id && (
        <div className="signup-step-two__message--error">{errors.id}</div>
      )}
      {!errors.id && (
        <div className="signup-step-two__message--default">
          {"영문 소문자 또는 숫자로 이루어진 4~16자"}
        </div>
      )}

      <input
        type="password"
        placeholder="비밀번호"
        className={`signup-step-two__input${
          errors.password ? "--invalid" : ""
        }`}
        value={signupPassword}
        onChange={handlePasswordChange}
      />
      {errors.password && (
        <div className="signup-step-two__message--error">{errors.password}</div>
      )}
      {!errors.password && (
        <div className="signup-step-two__message--default">
          {"하나 이상의 영문(대소문자), 숫자 포함 10자 이상"}
        </div>
      )}

      <div className="signup-step-two__navigation">
        <ColoredButton
          text="이전"
          onClick={onBeforeButtonClicked}
          className={"signup-step-two__btn--nav"}
        />
        <ColoredButton
          text="완료"
          colorScheme="orange"
          onClick={onCompleteButtonClicked}
          className={"signup-step-two__btn--nav"}
        />
      </div>
    </div>
  );
};

export default SignupStepTwo; // SignupStepTwo 컴포넌트 내보내기
