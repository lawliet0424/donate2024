import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ColoredButton from "../../components/ColoredButton";
import "./SignupFirstStep.css";
import {
  formatPhoneNumber,
  validateName,
  validateEmail,
  validatePhoneNumber,
} from "../../utils/FormatValidate";

const SignupFirstStep = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhoneNumber, setSignupPhoneNumber] = useState("");
  const [isNameTouched, setIsNameTouched] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPhoneNumberTouched, setIsPhoneNumberTouched] = useState(false);

  useEffect(() => {
    if (location.state) {
      const {
        signupName: savedSignupName,
        signupEmail: savedSignupEmail,
        signupPhoneNumber: savedSignupPhoneNumber,
      } = location.state;

      setSignupName(savedSignupName || "");
      setSignupEmail(savedSignupEmail || "");
      setSignupPhoneNumber(formatPhoneNumber(savedSignupPhoneNumber || ""));
    }
  }, [location.state]);

  const handleNameChange = (e) => {
    setSignupName(e.target.value);
    setIsNameTouched(true);
  };

  const handlePhoneNumberChange = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setSignupPhoneNumber(formattedPhoneNumber);
    setIsPhoneNumberTouched(true);
  };

  const handleEmailChange = (e) => {
    setSignupEmail(e.target.value);
    setIsEmailTouched(true);
  };

  const onNextButtonClicked = () => {
    const nameValidationError = validateName(signupName);
    const emailValidationError = validateEmail(signupEmail);
    const phoneNumberValidationError = validatePhoneNumber(signupPhoneNumber);

    const isNameValid = nameValidationError === "";
    const isEmailValid = emailValidationError === "";
    const isPhoneNumberValid = phoneNumberValidationError === "";

    if (!isNameValid || !isEmailValid || !isPhoneNumberValid) {
      setIsNameTouched(true);
      setIsEmailTouched(true);
      setIsPhoneNumberTouched(true);
      return; // 오류가 있으면 진행하지 않음
    }

    const numbersOnly = signupPhoneNumber.replace(/\D/g, "");

    navigate("/signup/step2", {
      state: {
        fromSignupFirst: true,
        signupName: signupName,
        signupEmail: signupEmail,
        signupPhoneNumber: numbersOnly,
      },
    });
  };

  const onClickToSignupButton = () => {
    navigate("/login");
  };

  const nameError = isNameTouched ? validateName(signupName) : "";
  const emailError = isEmailTouched ? validateEmail(signupEmail) : "";
  const phoneNumberError = isPhoneNumberTouched
    ? validatePhoneNumber(signupPhoneNumber)
    : "";

  return (
    <div className="SignupFirstStep">
      <div className="title">회원가입</div>
      <input
        type="text"
        placeholder="이름"
        value={signupName}
        onChange={handleNameChange}
        className={nameError ? "inputInvalid" : ""}
      />
      {nameError && <div className="errorMessage">{nameError}</div>}
      <input
        type="email"
        placeholder="메일"
        value={signupEmail}
        onChange={handleEmailChange}
        className={emailError ? "inputInvalid" : ""}
      />
      {emailError && <div className="errorMessage">{emailError}</div>}
      <input
        type="tel"
        placeholder="전화번호"
        value={signupPhoneNumber}
        onChange={handlePhoneNumberChange}
        maxLength={13}
        className={phoneNumberError ? "inputInvalid" : ""}
      />
      {phoneNumberError && (
        <div className="errorMessage">{phoneNumberError}</div>
      )}
      <ColoredButton
        text="다음"
        colorScheme="orange"
        onClick={onNextButtonClicked}
      />

      <div className="separator">
        <div className="line"></div>
        <div className="text">또는</div>
        <div className="line"></div>
      </div>

      <ColoredButton
        text="로그인"
        colorScheme="white"
        onClick={onClickToSignupButton}
      />
    </div>
  );
};

export default SignupFirstStep;
