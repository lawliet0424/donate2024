import { useEffect } from "react"; // React의 useEffect 훅 임포트
import { useNavigate, useLocation } from "react-router-dom"; // 라우팅 관련 훅 임포트
import useAuth from "../hooks/useAuth"; // 인증 관련 커스텀 훅 임포트

/*
Function name: PublicRoute
Summary: 공용 라우트를 정의하는 컴포넌트
Parameter: 총 2개
           ReactNode element; 렌더링할 요소
           boolean restricted; 접근 제한 여부
Return: 총 1개; 제한된 접근 시 null, 아닌 경우 요소 반환
Caller: N/A
Date: 2024-09-22
Write by: 길정수
*/
const PublicRoute = ({ element, restricted }) => {
  const { isAuthenticated } = useAuth(); // 인증 상태 가져오기
  const navigate = useNavigate(); // 네비게이션 함수 가져오기

  useEffect(() => {
    // 인증 상태에 따라 라우팅 처리
    if (isAuthenticated && restricted) {
      navigate("/", { replace: true }); // 인증된 경우 홈으로 리다이렉트
    }
  }, [isAuthenticated, restricted, navigate]); // 의존성 배열

  if (isAuthenticated && restricted) {
    return null; // 인증된 경우 요소 렌더링 방지
  }

  return element; // 요소 반환
};

export default PublicRoute; // PublicRoute 컴포넌트 내보내기
