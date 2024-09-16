import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ColoredButton from "../../components/ColoredButton";
import "./SignupStepOne.css";
import {
  formatPhoneNumber,
  validateName,
  validateEmail,
  validatePhoneNumber,
} from "../../utils/FormatValidate";

const SignupStepOne = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhoneNumber, setSignupPhoneNumber] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

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
    const newName = e.target.value;
    setSignupName(newName);
    setErrors((prevErrors) => ({
      ...prevErrors,
      name: validateName(newName),
    }));
  };

  const handlePhoneNumberChange = (e) => {
    const formattedInput = e.target.value;
    const numbersOnly = formattedInput.replace(/\D/g, "");

    setSignupPhoneNumber(numbersOnly);
    setErrors((prevErrors) => ({
      ...prevErrors,
      phoneNumber: validatePhoneNumber(formattedInput),
    }));
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setSignupEmail(newEmail);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: validateEmail(newEmail),
    }));
  };

  const onNextButtonClicked = () => {
    const nameValidationError = validateName(signupName);
    const emailValidationError = validateEmail(signupEmail);
    const phoneNumberValidationError = validatePhoneNumber(
      formatPhoneNumber(signupPhoneNumber)
    );

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
      return;
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

  return (
    <div className="signup-step-one">
      <div className="signup-step-one__title">회원가입</div>
      <input
        type="text"
        placeholder="이름"
        value={signupName}
        onChange={handleNameChange}
        className={`signup-step-one__input${errors.name ? "--invalid" : ""}`}
      />
      {errors.name && (
        <div className="signup-step-one__message--error">{errors.name}</div>
      )}
      <input
        type="email"
        placeholder="메일"
        value={signupEmail}
        onChange={handleEmailChange}
        className={`signup-step-one__input${errors.email ? "--invalid" : ""}`}
      />
      {errors.email && (
        <div className="signup-step-one__message--error">{errors.email}</div>
      )}
      <input
        type="tel"
        placeholder="전화번호"
        value={formatPhoneNumber(signupPhoneNumber)}
        onChange={handlePhoneNumberChange}
        maxLength={13}
        className={`signup-step-one__input${
          errors.phoneNumber ? "--invalid" : ""
        }`}
      />
      {errors.phoneNumber && (
        <div className="signup-step-one__message--error">
          {errors.phoneNumber}
        </div>
      )}
      <ColoredButton
        text="다음"
        colorScheme="orange"
        onClick={onNextButtonClicked}
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
        onClick={onClickToSignupButton}
        className={"signup-step-one__button--login"}
      />
    </div>
  );
};

export default SignupStepOne;
