import "./Header.css"; // CSS 파일 임포트
import { useNavigate } from "react-router-dom"; // React Router의 useNavigate 훅 임포트
import DoNateLogo from "../assets/DoNateLogo.png"; // 로고 이미지 임포트
import ColoredButton from "../components/ColoredButton"; // ColoredButton 컴포넌트 임포트
import TransparentButton from "../components/TransparentButton"; // TransparentButton 컴포넌트 임포트
import useAuth from "../hooks/useAuth"; // 사용자 인증 훅 임포트

/*
Function name: Header
Summary: Header 컴포넌트를 정의하는 함수
Parameter: 총 0개
Return: 총 1개; Header 컴포넌트 JSX
Caller: App
Date: 2024-09-22
Write by: 길정수
*/

// Header 컴포넌트 정의
const Header = () => {
  const { isAuthenticated, logout } = useAuth(); // 인증 상태와 로그아웃 함수 가져오기
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수 가져오기

  // 헤더 타이틀 클릭 시 홈으로 이동
  const onClickHeaderTitle = () => {
    navigate("/");
  };

  // 기부하기 버튼 클릭 시 인증 상태에 따라 페이지 이동
  const onClickHeaderDonationButton = () => {
    if (isAuthenticated) {
      navigate("/donation/step1");
    } else {
      window.alert("로그인을 먼저 해주세요."); // 인증되지 않은 경우 알림
      navigate("/login");
    }
  };

  // 로그인/로그아웃 버튼 클릭 시 인증 상태에 따라 처리
  const onClickHeaderLoginButton = async () => {
    if (isAuthenticated) {
      const confirmLogout = window.confirm("정말 로그아웃 하시겠습니까?"); // 로그아웃 확인
      if (confirmLogout) {
        try {
          await logout(); // 로그아웃 시도
          navigate("/login");
        } catch (error) {
          console.error("Logout failed", error); // 로그아웃 실패 로그
          window.alert("로그아웃에 실패했습니다. 다시 시도해 주세요."); // 알림 표시
        }
      }
    } else {
      navigate("/login"); // 인증되지 않은 경우 로그인 페이지로 이동
    }
  };

  // 회원가입 버튼 클릭 시 회원가입 페이지로 이동
  const onClickHeaderSignupButton = () => {
    navigate("/signup/step1");
  };

  // 마이페이지 버튼 클릭 시 인증 상태에 따라 페이지 이동
  const onClickHeaderMypageButton = () => {
    if (isAuthenticated) {
      navigate("/mypage");
    } else {
      window.alert("로그인을 먼저 해주세요."); // 인증되지 않은 경우 알림
      navigate("/login");
    }
  };

  return (
    <header className="header">
      {" "}
      {/* header 태그 사용 */}
      <div className="header__content">
        {" "}
        {/* header 내용 래핑 */}
        <div className="header__shortcut">
          <TransparentButton
            text={isAuthenticated ? "로그아웃" : "로그인"} // 인증 상태에 따라 텍스트 변경
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
        <div className="header__main">
          <div className="header__main--left">
            <img
              src={DoNateLogo}
              onClick={onClickHeaderTitle} // 로고 클릭 시 홈으로 이동
              alt="DoNate Logo"
            />
          </div>
          <div className="header__main--right">
            <ColoredButton
              text="기부하기"
              colorScheme="orange"
              onClick={onClickHeaderDonationButton}
              className="header__donationButton"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; // Header 컴포넌트 내보내기
