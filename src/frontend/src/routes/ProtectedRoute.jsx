import { useEffect, useState } from "react"; // React의 useEffect와 useState 훅 임포트
import { useNavigate, useLocation } from "react-router-dom"; // 라우팅 관련 훅 임포트
import useAuth from "../hooks/useAuth"; // 인증 관련 커스텀 훅 임포트

/*
Function name: ProtectedRoute
Summary: 보호된 라우트를 정의하는 컴포넌트
Parameter: 총 1개
           ReactNode element; 렌더링할 요소
Return: 총 1개; 로딩 중일 때 null, 인증된 경우 요소 반환
Caller: N/A
Date: 2024-09-22
Write by: 길정수
*/
const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth(); // 인증 상태 가져오기
  const navigate = useNavigate(); // 네비게이션 함수 가져오기
  const location = useLocation(); // 현재 위치 정보 가져오기
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    // 인증 상태에 따라 라우팅 처리
    if (!isAuthenticated) {
      window.alert("로그인을 먼저 해주세요."); // 인증되지 않은 경우 알림
      navigate("/login", { state: { from: location.pathname } }); // 로그인 페이지로 리다이렉트
    } else {
      setIsLoading(false); // 인증된 경우 로딩 종료
    }
  }, [isAuthenticated, navigate, location.pathname]); // 의존성 배열

  if (isLoading) {
    return null; // 로딩 중일 때 null 반환
  }

  return element; // 인증된 경우 요소 반환
};

export default ProtectedRoute; // ProtectedRoute 컴포넌트 내보내기
