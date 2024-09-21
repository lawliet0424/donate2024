import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

// 관심 수혜자 관련 컨텍스트 생성
export const InterestContext = createContext();

/*
  Function name: InterestProvider
  Summary: 사용자 관심 수혜자 데이터를 관리하고 제공하는 컨텍스트 프로바이더
  Parameter: 총 1개
             node children; 자식 컴포넌트를 포함하는 JSX 요소
  Return: 총 1개; 관심 수혜자 상태를 제공하는 JSX Provider 컴포넌트
  Date: 2024.09.21
  Write by: 길정수
*/
export const InterestProvider = ({ children }) => {
  const [userInterests, setUserInterests] = useState([]); // 사용자 관심 수혜자 목록
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 오류 상태
  const { user } = useAuth(); // 인증된 사용자 정보 가져오기

  /*
    Function name: getInterest
    Summary: 서버에서 사용자 관심 수혜자 ID 리스트를 받아오는 함수
    Parameter: 없음
    Return: 없음; 사용자 관심 목록을 상태로 저장
  */
  const getInterest = useCallback(async () => {
    if (!user || !user.donorId) return; // 사용자 정보가 없으면 함수 종료

    setLoading(true); // 로딩 시작
    setError(null); // 오류 초기화

    try {
      // 서버에서 관심 수혜자 ID 리스트 요청
      const response = await axios.get("/api/interest/get", {
        withCredentials: true,
      });
      setUserInterests(response.data); // 서버로부터 받은 데이터 저장
    } catch (error) {
      console.error("Failed to load user interests", error);
      setError("Failed to load user interests"); // 오류 발생 시 처리
      setUserInterests([]); // 오류 발생 시 관심 목록 초기화
    } finally {
      setLoading(false); // 로딩 종료
    }
  }, [user]);

  useEffect(() => {
    getInterest(); // 컴포넌트가 마운트될 때 사용자 관심 목록을 가져옴
  }, [getInterest]);

  /*
    Function name: toggleInterest
    Summary: 특정 수혜자 ID의 관심 여부를 토글하고 서버에 변경 사항을 반영하는 함수
    Parameter: 총 1개
               string beneficiaryId; 수혜자 ID
    Return: 없음; 상태를 업데이트
  */
  const toggleInterest = async (beneficiaryId) => {
    const isInterested = userInterests.includes(beneficiaryId); // 현재 관심 여부 확인
    setLoading(true); // 로딩 시작
    setError(null); // 오류 초기화

    try {
      // 관심 목록 업데이트
      const updatedInterests = isInterested
        ? userInterests.filter((id) => id !== beneficiaryId) // 관심 해제
        : [...userInterests, beneficiaryId]; // 관심 추가

      // 서버에 변경된 관심 목록 전체를 전송
      await axios.post(
        "/api/interest/toggle",
        { interests: updatedInterests },
        { withCredentials: true }
      );

      setUserInterests(updatedInterests); // 상태 업데이트
    } catch (error) {
      console.error("Failed to toggle interest", error);
      setError("Failed to toggle interest"); // 오류 발생 시 처리
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    <InterestContext.Provider
      value={{
        toggleInterest, // 관심 여부 토글 함수
        userInterests, // 사용자 관심 수혜자 목록
        loading, // 로딩 상태
        error, // 오류 상태
      }}
    >
      {children} {/* 자식 컴포넌트를 렌더링 */}
    </InterestContext.Provider>
  );
};
