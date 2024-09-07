import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { mockGetBeneficiary } from "../api";

export const BeneficiaryContext = createContext();

export const BeneficiaryProvider = ({ children }) => {
  const [beneficiaries, setBeneficiaries] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 선택된 태그 리스트, 인원수, 1인당 수혜금액을 서버에 전송하고 수혜자 정보를 받아오는 함수
  const getSelectedBeneficiary = async (
    selectedTagList,
    numberOfPeople,
    amountPerPerson
  ) => {
    // setLoading(true);
    // setError(null);
    // try {
    //   const response = await axios.get("/donation/step3", {
    //     params: {
    //       tags: selectedTagList, // 선택된 태그 리스트
    //       people: numberOfPeople, // 인원수
    //       amount: amountPerPerson, // 1인당 수혜금액
    //     },
    //   });
    //   setBeneficiaries(response.data); // 받아온 데이터를 상태에 저장
    // } catch (err) {
    //   console.error("Failed to load selected beneficiaries", err);
    //   setError(err.message || "Failed to load selected beneficiaries");
    // } finally {
    //   setLoading(false);
    // }
  };

  // 수혜자 ID를 서버에 보내고 해당 수혜자의 상세 정보를 받아오는 함수
  const getBeneficiaryDetail = async (beneficiaryId) => {
    // setLoading(true);
    // setError(null);
    // try {
    //   const response = await axios.get(`/beneficiaries/${beneficiaryId}`);
    //   setBeneficiaries((prev) => ({
    //     ...prev,
    //     [beneficiaryId]: response.data,
    //   }));
    // } catch (err) {
    //   console.error("Failed to load beneficiary details", err);
    //   setError(err.message || "Failed to load beneficiary details");
    // } finally {
    //   setLoading(false);
    // }
  };

  // 관심 수혜자 정보를 받아오는 함수
  const getInterestBeneficiary = async () => {
    // setLoading(true);
    // setError(null);
    // try {
    //   const response = await axios.get("/beneficiaries/interest");
    //   setBeneficiaries(response.data);
    // } catch (err) {
    //   console.error("Failed to load interest beneficiaries", err);
    //   setError(err.message || "Failed to load interest beneficiaries");
    // } finally {
    //   setLoading(false);
    // }
  };

  const getBeneficiaryById = async (beneficiaryId, forceRefresh = false) => {
    const cachedData = localStorage.getItem(`beneficiary_${beneficiaryId}`);
    if (!forceRefresh && cachedData) {
      setBeneficiaries((prev) => ({
        ...prev,
        [beneficiaryId]: JSON.parse(cachedData),
      }));
      return;
    }

    setLoading(true);

    try {
      const data = await mockGetBeneficiary(beneficiaryId);
      localStorage.setItem(
        `beneficiary_${beneficiaryId}`,
        JSON.stringify(data)
      );

      setBeneficiaries((prev) => ({
        ...prev,
        [beneficiaryId]: data,
      }));
    } catch (err) {
      setError(err.message || "Failed to load beneficiary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BeneficiaryContext.Provider
      value={{
        beneficiaries,
        getSelectedBeneficiary,
        getBeneficiaryDetail,
        getInterestBeneficiary,
        getBeneficiaryById,
        loading,
        error,
      }}
    >
      {children}
    </BeneficiaryContext.Provider>
  );
};
