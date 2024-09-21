import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// 수혜자 컨텍스트 생성
export const BeneficiaryContext = createContext();

/*
  Function name: BeneficiaryProvider
  Summary: 수혜자 데이터를 관리하고 제공하는 컨텍스트 프로바이더
  Parameter: 총 1개
             node children; 자식 컴포넌트를 포함하는 JSX 요소
  Return: 총 1개; 수혜자 상태를 제공하는 JSX Provider 컴포넌트
  Date: 2024.09.21
  Write by: 길정수
*/
export const BeneficiaryProvider = ({ children }) => {
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([]); // 선택된 수혜자 목록
  const [beneficiaryDetailInfo, setBeneficiaryDetailInfo] = useState({}); // 수혜자 상세 정보
  const [interestBeneficiaries, setInterestBeneficiaries] = useState([]); // 관심 수혜자 목록
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 오류 상태

  /*
    Function name: getSelectedBeneficiaries
    Summary: 선택된 태그 리스트와 인원수, 1인당 수혜 금액을 서버에 전송하고 수혜자 정보를 받아오는 함수
    Parameter: 총 3개
               array selectedTagList; 선택된 태그 목록
               number numberOfPeople; 선택된 인원수
               number amountPerPerson; 1인당 수혜 금액
    Return: 없음; 수혜자 데이터를 상태로 저장
  */
  const getSelectedBeneficiaries = async (
    selectedTagList,
    numberOfPeople,
    amountPerPerson
  ) => {
    setLoading(true); // 로딩 시작
    setError(null); // 오류 초기화
    try {
      // 서버로부터 선택된 수혜자 정보 요청
      const response = await axios.get("/api/donation/step3", {
        params: {
          tags: selectedTagList,
          personnel: numberOfPeople,
          amount: amountPerPerson,
        },
      });
      setSelectedBeneficiaries(response.data); // 서버로부터 받은 수혜자 데이터 저장
    } catch (err) {
      console.error("Failed to load selected beneficiaries", err);
      setError(err.message || "Failed to load selected beneficiaries"); // 오류 발생 시 처리
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
      // 서버로부터 수혜자 상세 정보 요청
      const response = await axios.get(`/api/beneficiaries/${beneficiaryId}`);
      setBeneficiaryDetailInfo((prev) => ({
        ...prev,
        [beneficiaryId]: response.data, // 각 수혜자 ID에 해당하는 데이터 저장
      }));
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
      // 서버로부터 관심 수혜자 정보 요청
      const response = await axios.get("/api/myinterest");
      setInterestBeneficiaries(response.data); // 서버로부터 받은 관심 수혜자 목록 저장
    } catch (err) {
      console.error("Failed to load interest beneficiaries", err);
      setError(err.message || "Failed to load interest beneficiaries"); // 오류 발생 시 처리
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    <BeneficiaryContext.Provider
      value={{
        selectedBeneficiaries, // 선택된 수혜자 목록
        beneficiaryDetailInfo, // 수혜자 상세 정보
        interestBeneficiaries, // 관심 수혜자 목록
        getSelectedBeneficiaries, // 선택된 수혜자 정보를 가져오는 함수
        getBeneficiaryDetail, // 수혜자 상세 정보를 가져오는 함수
        getInterestBeneficiary, // 관심 수혜자 정보를 가져오는 함수
        loading, // 로딩 상태
        error, // 오류 상태
      }}
    >
      {children} {/* 자식 컴포넌트를 렌더링 */}
    </BeneficiaryContext.Provider>
  );
};
