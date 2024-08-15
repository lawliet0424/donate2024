import "./Header.css";
import { useNavigate } from "react-router-dom";
import DoNateLogo from "../assets/DoNateLogo.png";
import ColoredButton from "../components/ColoredButton";
import TransparentButton from "../components/TransparentButton";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const nav = useNavigate();

  const onClickHeaderTitle = () => {
    nav("/");
  };

  const onClickHeaderDonationButton = () => {
    if (isAuthenticated) {
      nav("/donation");
    } else {
      window.alert("로그인을 먼저 해주세요.");
      nav("/login");
    }
  };

  const onClickHeaderLoginButton = () => {
    if (isAuthenticated) {
      const confirmLogout = window.confirm("정말 로그아웃 하시겠습니까?");
      if (confirmLogout) {
        logout();
        nav("/login");
      }
    } else {
      nav("/login");
    }
  };

  const onClickHeaderSignupButton = () => {
    nav("/signup");
  };

  const onClickHeaderMypageButton = () => {
    if (isAuthenticated) {
      nav("/mypage");
    } else {
      window.alert("로그인을 먼저 해주세요.");
      nav("/login");
    }
  };

  return (
    <header className="Header">
      <div className="headerShortcut">
        <TransparentButton
          text={isAuthenticated ? "로그아웃" : "로그인"}
          onClick={onClickHeaderLoginButton}
        />
        {!isAuthenticated && (
          <TransparentButton
            text={"회원가입"}
            onClick={onClickHeaderSignupButton}
          />
        )}
        <TransparentButton
          text={"마이페이지"}
          onClick={onClickHeaderMypageButton}
        />
      </div>
      <div className="hearderEntire">
        <div className="headerLeft">
          <img
            src={DoNateLogo}
            onClick={onClickHeaderTitle}
            alt="DoNate Logo"
          />
        </div>

        <div className="headerRight">
          <ColoredButton
            text={"기부하기"}
            type={"Orange"}
            onClick={onClickHeaderDonationButton}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
