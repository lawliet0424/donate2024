import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// 사용자 인증 관련 정보를 제공하는 커스텀 훅
const useAuth = () => {
  // AuthContext에서 사용자 정보 및 인증 관련 메서드 가져오기
  const {
    user, // 현재 사용자 정보
    isAuthenticated, // 인증 상태
    signupFirstPage, // 회원가입 1단계 함수
    signupSecondPage, // 회원가입 2단계 함수
    login, // 로그인 함수
    logout, // 로그아웃 함수
    getUserInfo, // 사용자 정보 가져오는 함수
    updateUserInfo, // 사용자 정보 업데이트 함수
    checkIdDuplicate, // 아이디 중복 체크 함수
  } = useContext(AuthContext); // AuthContext 사용

  // 필요한 값들을 반환
  return {
    user,
    isAuthenticated,
    signupFirstPage,
    signupSecondPage,
    login,
    logout,
    getUserInfo,
    updateUserInfo,
    checkIdDuplicate,
  };
};

export default useAuth; // 훅 내보내기
