import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { authAxios } from './AuthContext';

// 관심 수혜자 관련 컨텍스트 생성
export const HistoryContext = createContext();

/*
  Function name: HistoryProvider
  Summary: 사용자 관심 수혜자 데이터를 관리하고 제공하는 컨텍스트 프로바이더
  Parameter: 총 1개
             node children; 자식 컴포넌트를 포함하는 JSX 요소
  Return: 총 1개; 관심 수혜자 상태를 제공하는 JSX Provider 컴포넌트
*/
export const HistoryProvider = ({ children }) => {
    const [historyInfo, setHistoryInfo] = useState([]); // 수혜자 정보 통합 상태
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [error, setError] = useState(null); // 오류 상태

    /*
      Function name: getHistory
      Summary:
      Parameter:
      Return:
    */
    const getHistory = async () => {
      setLoading(true); // 로딩 시작
      setError(null); // 오류 초기화
      try {
        const response = await authAxios.get("/api/myhistory");
        setHistoryInfo(response.data);
      } catch (err) {
        console.error("Failed to load donation history", err);
        setError(err.message || "Failed to load donation history"); // 오류 발생 시 처리
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

  /*
    Function name: getHistoryDetail
    Summary:
    Parameter:
    Return:
  */
  const getHistoryDetail = async (historyId) => {
    setLoading(true); // 로딩 시작
    setError(null); // 오류 초기화
    try {
      const response = await authAxios.get(`/api/myhistory/${historyId}`);
      setHistoryInfo([response.data]);
      console.log(response.data);
    } catch (err) {
      console.error("Failed to load donation history detail", err);
      setError(err.message || "Failed to load donation history detail"); // 오류 발생 시 처리
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    <HistoryContext.Provider
      value={{
          historyInfo,
          getHistory,
          getHistoryDetail,
        loading, // 로딩 상태
        error, // 오류 상태
      }}
    >
      {children} {/* 자식 컴포넌트를 렌더링 */}
    </HistoryContext.Provider>
  );
};
