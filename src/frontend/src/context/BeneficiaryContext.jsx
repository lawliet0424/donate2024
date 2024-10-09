import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { authAxios } from './AuthContext';

// 수혜자 컨텍스트 생성
export const BeneficiaryContext = createContext();

/*
  Function name: BeneficiaryProvider
  Summary: 수혜자 데이터를 관리하고 제공하는 컨텍스트 프로바이더
  Parameter: 총 1개
             node children; 자식 컴포넌트를 포함하는 JSX 요소
  Return: 총 1개; 수혜자 상태를 제공하는 JSX Provider 컴포넌트
*/
export const BeneficiaryProvider = ({ children }) => {
  const [beneficiaryInfo, setBeneficiaryInfo] = useState([]); // 수혜자 정보 통합 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 오류 상태

  /*
    Function name: getSelectedBeneficiaries
    Summary: 선택된 태그 리스트와 인원수, 1인당 수혜 금액을 서버에 전송하고 수혜자 정보를 받아오는 함수
    Parameter: 총 2개
               array selectedTagList; 선택된 태그 목록
               number numberOfPeople; 선택된 인원수
    Return: 없음; 수혜자 데이터를 상태로 저장
  */
  const getSelectedBeneficiaries = async (
    selectedTagList,
    numberOfPeople,
  ) => {
    setLoading(true); // 로딩 시작
    setError(null); // 오류 초기화
    try {
      const response = await authAxios.get("/api/donation/step3", {
        params: {
          tags: selectedTagList,
          personnel: numberOfPeople
        },
        paramsSerializer: (params) => {
          return Object.keys(params)
            .map((key) => {
              const value = params[key];
              if (Array.isArray(value)) {
                return value.map((val) => `${key}=${encodeURIComponent(val)}`).join("&");
              }
              return `${key}=${encodeURIComponent(value)}`;
            })
            .join("&");
        },
      });
      setBeneficiaryInfo(response.data);

    } catch (err) {
      console.error("Failed to load selected beneficiaries", err);
      setError(err || "Failed to load selected beneficiaries"); // 오류 발생 시 처리
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  /*
    Function name: getBeneficiaryDetail
    Summary: 수혜자 ID를 서버에 전송하고 해당 수혜자의 상세 정보를 받아오는 함수
    Parameter: 총 1개
               string beneficiaryId; 수혜자 ID
    Return: 없음; 수혜자 상세 정보를 상태로 저장
  */
  const getBeneficiaryDetail = async (beneficiaryId) => {
    setLoading(true); // 로딩 시작
    setError(null); // 오류 초기화
    try {
      const response = await authAxios.get(`/api/beneficiary/${beneficiaryId}`);
      setBeneficiaryInfo([response.data]);
    } catch (err) {
      console.error("Failed to load beneficiary details", err);
      setError(err.message || "Failed to load beneficiary details"); // 오류 발생 시 처리
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  /*
    Function name: getInterestBeneficiary
    Summary: 관심 수혜자 정보를 받아오는 함수
    Parameter: 없음
    Return: 없음; 관심 수혜자 목록을 상태로 저장
  */
  const getInterestBeneficiary = async () => {
    setLoading(true); // 로딩 시작
    setError(null); // 오류 초기화
    try {
      const response = await authAxios.get("/api/myinterest");
      setBeneficiaryInfo(response.data);
    } catch (err) {
      console.error("Failed to load interest beneficiaries", err);
      setError(err.message || "Failed to load interest beneficiaries"); // 오류 발생 시 처리
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  const toggleInterestAboutBeneficiary = async (beneficiaryId) => {
    setLoading(true); // 로딩 시작
    setError(null); // 오류 초기화

    try {
      const response = await authAxios.post("/api/interest/toggle", { beneficiaryId });
        setBeneficiaryInfo(prev =>
        prev.map(beneficiary =>
          beneficiary.beneficiaryId === beneficiaryId
            ? { ...beneficiary, isInterested: response.data.isInterested } // 응답 데이터에서 isInterested를 사용
            : beneficiary
        )
      );
    } catch (error) {
      console.error("Failed to toggle interest", error);
      setError("Failed to toggle interest"); // 오류 발생 시 처리
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    <BeneficiaryContext.Provider
      value={{
        beneficiaryInfo, // 수혜자 정보 통합 상태
        getSelectedBeneficiaries, // 선택된 수혜자 정보를 가져오는 함수
        getBeneficiaryDetail, // 수혜자 상세 정보를 가져오는 함수
        getInterestBeneficiary, // 관심 수혜자 정보를 가져오는 함수
        toggleInterestAboutBeneficiary,
        loading, // 로딩 상태
        error, // 오류 상태
      }}
    >
      {children} {/* 자식 컴포넌트를 렌더링 */}
    </BeneficiaryContext.Provider>
  );
};
