import "./SignupDone.css";
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import checkMark from "../../assets/checkMark.png";
import ColoredButton from "../../components/ColoredButton";

const SignupDone = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state?.fromSignupSecond) {
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
    <div className="signup-done">
      <img className="signup-done__checkMark" src={checkMark} alt="checkMark" />

      <div className="signup-done__title">회원가입이 완료되었습니다!</div>

      <div className="signup-done__text">
        로그인 후 모든 서비스를 이용할 수 있습니다.
      </div>

      <div className="signup-done__navigation">
        <ColoredButton
          text={"메인"}
          onClick={onHomeButtonClicked}
          className={"signup-done__button"}
        />
        <ColoredButton
          text={"로그인"}
          colorScheme={"orange"}
          onClick={onLoginButtonClicked}
          className={"signup-done__button"}
        />
      </div>
    </div>
  );
};

export default SignupDone;
