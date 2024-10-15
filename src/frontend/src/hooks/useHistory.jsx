import { useContext } from "react";
import { HistoryContext } from "../context/HistoryContext";


// 관심 수혜자 관련 정보를 제공하는 커스텀 훅
const useHistory = () => {
  // HistoryContext에서 가져오기
  const {
      historyInfo,
      getHistory,
    getHistoryDetail,
    loading, // 로딩 상태
    error, // 에러 상태
  } = useContext(HistoryContext); // HistoryContext 사용

  // 필요한 값들을 반환
  return {
      historyInfo,
    getHistory,
    getHistoryDetail,
    loading,
    error,
  };
};

export default useHistory; // 훅 내보내기
