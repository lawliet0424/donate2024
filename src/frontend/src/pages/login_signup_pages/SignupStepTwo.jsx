import "./SignupStepTwo.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ColoredButton from "../../components/ColoredButton";
import {
  validateNickname,
  validateId,
  validatePassword,
} from "../../utils/FormatValidate";
import useAuth from "../../hooks/useAuth";

const SignupStepTwo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signup, checkIdDuplicate } = useAuth();

  const [signupNickname, setSignupNickname] = useState("");
  const [signupId, setSignupId] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const [errors, setErrors] = useState({
    nickname: "",
    id: "",
    password: "",
  });

  const [isIdDuplicate, setIsIdDuplicate] = useState(null);

  useEffect(() => {
    if (!location.state?.fromSignupFirst) {
      window.alert("잘못된 접근입니다. 홈으로 이동합니다.");
      navigate("/");
    }
  }, [location.state, navigate]);

  const { signupName, signupEmail, signupPhoneNumber } = location.state || {};

  const handleNicknameChange = (e) => {
    const newNickname = e.target.value;
    setSignupNickname(newNickname);
    setErrors((prevErrors) => ({
      ...prevErrors,
      nickname: validateNickname(newNickname),
    }));
  };

  const handleIdChange = (e) => {
    const newId = e.target.value;
    setSignupId(newId);
    setErrors((prevErrors) => ({
      ...prevErrors,
      id: validateId(newId),
    }));
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setSignupPassword(newPassword);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: validatePassword(newPassword, signupId),
    }));
  };

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
      navigate("/error");
      console.error("Signup failed", error);
    }
  };

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

export default SignupStepTwo;
