import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ColoredButton from "../../components/ColoredButton";
import "./SignupSecondStep.css";

const SignupSecondStep = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [signupNickname, setSignupNickname] = useState("");
  const [signupId, setSignupId] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  if (!location.state || !location.state.fromSignupFirst) {
    window.alert("잘못된 접근입니다. 홈으로 이동합니다.");
    navigate("/");
    return null;
  }

  const { signupName, signupEmail } = location.state;

  const onSignupButtonClicked = () => {
    // 회원가입 로직 추가
    console.log({
      signupName,
      signupEmail,
      signupNickname,
      signupId,
      signupPassword,
    });
    navigate("/login");
  };
  const onBeforeButtonClicked = () => {
    navigate("/signup");
  };

  const onDuplicateCheckButtonClicked = () => {
    console.log("아이디 중복 확인 버튼 클릭");
  };

  const onSignupNicknameChange = (event) =>
    setSignupNickname(event.target.value);
  const onSignupIdChange = (event) => setSignupId(event.target.value);
  const onSignupPasswordChange = (event) =>
    setSignupPassword(event.target.value);

  return (
    <div className="SignupSecondStep">
      <div className="title">회원가입</div>

      <input
        placeholder="닉네임"
        value={signupNickname}
        onChange={onSignupNicknameChange}
      />
      <div className="idForm">
        <input
          placeholder="아이디"
          value={signupId}
          onChange={onSignupIdChange}
        />
        <button
          className="duplicateCheckButton"
          onClick={onDuplicateCheckButtonClicked}
        >
          중복 확인
        </button>
      </div>
      <input
        placeholder="비밀번호"
        value={signupPassword}
        onChange={onSignupPasswordChange}
        type="password"
      />

      <div className="pageNavigationButtons">
        <ColoredButton text="이전" onClick={onBeforeButtonClicked} />
        <ColoredButton
          text="완료"
          type="Orange"
          onClick={onSignupButtonClicked}
        />
      </div>
    </div>
  );
};

export default SignupSecondStep;
