import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ColoredButton from "../../components/ColoredButton";
import {
  formatPhoneNumber,
  validateName,
  validateEmail,
  validatePhoneNumber,
  validateNickname,
  validateId,
  validatePassword,
} from "../../utils/FormatValidate";
import useAuth from "../../hooks/useAuth";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const { signup, checkIdDuplicate } = useAuth();

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhoneNumber, setSignupPhoneNumber] = useState("");
  const [signupNickname, setSignupNickname] = useState("");
  const [signupId, setSignupId] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    nickname: "",
    id: "",
    password: "",
  });
  const [isIdDuplicate, setIsIdDuplicate] = useState(null);

  // 기본 안내 메시지 설정
  const defaultMessages = {
    nickname: "한글 또는 영문(대소문자)으로만 2~5자",
    id: "영문 소문자 또는 숫자로 이루어진 4~16자",
    password: "하나 이상의 영문(대소문자), 숫자 포함 10자 이상",
  };

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
      return;
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

    try {
      await signup(
        signupName,
        signupEmail,
        signupPhoneNumber,
        signupNickname,
        signupId,
        signupPassword
      );
      navigate("/signup/done", { state: { fromSignup: true } });
    } catch (error) {
      window.alert("오류가 발생하였습니다.");
      navigate("/error");
    }
  };

  return (
    <div className="signup">
      <div className="signup__title">회원가입</div>
      <input
        type="text"
        placeholder="이름"
        value={signupName}
        onChange={handleNameChange}
        className={`signup__input${errors.name ? "--invalid" : ""}`}
      />
      {errors.name && (
        <div className="signup__message--error">{errors.name}</div>
      )}
      <input
        type="email"
        placeholder="메일"
        value={signupEmail}
        onChange={handleEmailChange}
        className={`signup__input${errors.email ? "--invalid" : ""}`}
      />
      {errors.email && (
        <div className="signup__message--error">{errors.email}</div>
      )}
      <input
        type="tel"
        placeholder="전화번호"
        value={formatPhoneNumber(signupPhoneNumber)}
        onChange={handlePhoneNumberChange}
        maxLength={13}
        className={`signup__input${errors.phoneNumber ? "--invalid" : ""}`}
      />
      {errors.phoneNumber && (
        <div className="signup__message--error">{errors.phoneNumber}</div>
      )}
      <input
        type="text"
        placeholder="닉네임"
        value={signupNickname}
        onChange={handleNicknameChange}
        className={`signup__input${errors.nickname ? "--invalid" : ""}`}
      />
      {errors.nickname ? (
        <div className="signup__message--error">{errors.nickname}</div>
      ) : (
        <div className="signup__message--default">
          {defaultMessages.nickname}
        </div>
      )}
      <div className="signup__id-row">
        <input
          type="text"
          placeholder="아이디"
          value={signupId}
          onChange={handleIdChange}
          className={`signup__id${errors.id ? "--invalid" : ""}`}
        />
        <ColoredButton
          text="중복 확인"
          colorScheme="orange"
          onClick={onDuplicateCheckButtonClicked}
          className={"signup__btn--duplicate"}
        />
      </div>
      {errors.id ? (
        <div className="signup__message--error">{errors.id}</div>
      ) : (
        <div className="signup__message--default">{defaultMessages.id}</div>
      )}
      <input
        type="password"
        placeholder="비밀번호"
        value={signupPassword}
        onChange={handlePasswordChange}
        className={`signup__input${errors.password ? "--invalid" : ""}`}
      />
      {errors.password ? (
        <div className="signup__message--error">{errors.password}</div>
      ) : (
        <div className="signup__message--default">
          {defaultMessages.password}
        </div>
      )}
      <ColoredButton
        text="완료"
        colorScheme="orange"
        onClick={onCompleteButtonClicked}
        className={"signup__btn--done"}
      />
    </div>
  );
};

export default Signup;
