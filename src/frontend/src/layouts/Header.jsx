import "./Header.css";
import { useNavigate } from "react-router-dom";
import DoNateLogo from "../assets/DoNateLogo.png";
import ColoredButton from "../components/ColoredButton";
import TransparentButton from "../components/TransparentButton";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const onClickHeaderTitle = () => {
    navigate("/");
  };

  const onClickHeaderDonationButton = () => {
    if (isAuthenticated) {
      navigate("/donation");
    } else {
      window.alert("로그인을 먼저 해주세요.");
      navigate("/login");
    }
  };

  const onClickHeaderLoginButton = async () => {
    if (isAuthenticated) {
      const confirmLogout = window.confirm("정말 로그아웃 하시겠습니까?");
      if (confirmLogout) {
        try {
          await logout(); // 로그아웃 요청을 서버에 보냄
          navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
        } catch (error) {
          console.error("Logout failed", error);
          window.alert("로그아웃에 실패했습니다. 다시 시도해 주세요.");
        }
      }
    } else {
      navigate("/login");
    }
  };

  const onClickHeaderSignupButton = () => {
    navigate("/signup");
  };

  const onClickHeaderMypageButton = () => {
    if (isAuthenticated) {
      navigate("/mypage");
    } else {
      window.alert("로그인을 먼저 해주세요.");
      navigate("/login");
    }
  };

  return (
    <header className="Header">
      <div className="Header__content">
        <div className="Header__shortcut">
          <TransparentButton
            text={isAuthenticated ? "로그아웃" : "로그인"}
            onClick={onClickHeaderLoginButton}
          />
          {!isAuthenticated && (
            <TransparentButton
              text="회원가입"
              onClick={onClickHeaderSignupButton}
            />
          )}
          <TransparentButton
            text="마이페이지"
            onClick={onClickHeaderMypageButton}
          />
        </div>
        <div className="Header__main">
          <div className="Header__main--left">
            <img
              src={DoNateLogo}
              onClick={onClickHeaderTitle}
              alt="DoNate Logo"
            />
          </div>
          <div className="Header__main--right">
            <ColoredButton
              text="기부하기"
              colorScheme="orange"
              onClick={onClickHeaderDonationButton}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
