import "./SignupDone.css";
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import checkMark from "../../assets/checkMark.png";
import ColoredButton from "../../components/ColoredButton";

const SignupDone = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state?.fromSignupFirst) {
      window.alert("잘못된 접근입니다. 홈으로 이동합니다.");
      navigate("/");
    }
  }, [location.state, navigate]);

  const onLoginButtonClicked = () => {
    navigate("/login");
  };

  const onHomeButtonClicked = () => {
    navigate("/");
  };

  return (
    <div className="SignupDone">
      <img className="checkMark" src={checkMark} alt="checkMark" />

      <div className="title">회원가입이 완료되었습니다!</div>

      <div className="resultText">
        로그인 후 모든 서비스를 이용할 수 있습니다.
      </div>

      <div className="pageNavigationButtons">
        <ColoredButton text={"메인"} onClick={onHomeButtonClicked} />
        <ColoredButton
          text={"로그인"}
          colorScheme={"orange"}
          onClick={onLoginButtonClicked}
        />
      </div>
    </div>
  );
};

export default SignupDone;
