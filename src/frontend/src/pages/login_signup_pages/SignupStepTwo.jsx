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
  const { signup } = useAuth();

  const [signupNickname, setSignupNickname] = useState("");
  const [signupId, setSignupId] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const [errors, setErrors] = useState({
    nickname: "",
    id: "",
    password: "",
  });

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

  const onCompleteButtonClicked = async () => {
    if (!errors.nickname && !errors.id && !errors.password) {
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
        console.error("Login failed", error);
      }
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
        className={`signup-step-two__input ${
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

      <input
        type="text"
        placeholder="아이디"
        className={`signup-step-two__input ${errors.id ? "--invalid" : ""}`}
        value={signupId}
        onChange={handleIdChange}
      />

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
        className={`signup-step-two__input ${
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

      <div className="pageNavigationButtons">
        <ColoredButton text="이전" onClick={onBeforeButtonClicked} />
        <ColoredButton
          text="완료"
          colorScheme="orange"
          onClick={onCompleteButtonClicked}
        />
      </div>
    </div>
  );
};

export default SignupStepTwo;
