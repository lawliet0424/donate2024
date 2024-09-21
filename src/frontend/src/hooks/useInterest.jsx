import { useContext } from "react";
import { InterestContext } from "../context/InterestContext";

// 관심 수혜자 관련 정보를 제공하는 커스텀 훅
const useInterest = () => {
  // InterestContext에서 관심 수혜자 관련 함수 및 상태 가져오기
  const {
    getInterest, // 관심 수혜자를 가져오는 함수
    toggleInterest, // 관심 수혜자를 토글하는 함수
    loading, // 로딩 상태
    error, // 에러 상태
  } = useContext(InterestContext); // InterestContext 사용

  // 필요한 값들을 반환
  return {
    getInterest,
    toggleInterest,
    loading,
    error,
  };
};

export default useInterest; // 훅 내보내기
