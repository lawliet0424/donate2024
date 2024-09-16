import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const BeneficiaryContext = createContext();

export const BeneficiaryProvider = ({ children }) => {
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([]);
  const [beneficiaryDetailInfo, setBeneficiaryDetailInfo] = useState({});
  const [interestBeneficiaries, setInterestBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 선택된 태그 리스트, 인원수, 1인당 수혜금액을 서버에 전송하고 수혜자 정보를 받아오는 함수
  const getSelectedBeneficiaries = async (
    selectedTagList,
    numberOfPeople,
    amountPerPerson
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/donation/step3", {
        params: {
          tags: selectedTagList,
          personnel: numberOfPeople,
          amount: amountPerPerson,
        },
      });
      setSelectedBeneficiaries(response.data);
    } catch (err) {
      console.error("Failed to load selected beneficiaries", err);
      setError(err.message || "Failed to load selected beneficiaries");
    } finally {
      setLoading(false);
    }
  };

  // 수혜자 ID를 서버에 보내고 해당 수혜자의 상세 정보를 받아오는 함수
  const getBeneficiaryDetail = async (beneficiaryId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/beneficiaries/${beneficiaryId}`);
      setBeneficiaryDetailInfo((prev) => ({
        ...prev,
        [beneficiaryId]: response.data,
      }));
    } catch (err) {
      console.error("Failed to load beneficiary details", err);
      setError(err.message || "Failed to load beneficiary details");
    } finally {
      setLoading(false);
    }
  };

  // 관심 수혜자 정보를 받아오는 함수
  const getInterestBeneficiary = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/myinterest");
      setInterestBeneficiaries(response.data);
    } catch (err) {
      console.error("Failed to load interest beneficiaries", err);
      setError(err.message || "Failed to load interest beneficiaries");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BeneficiaryContext.Provider
      value={{
        selectedBeneficiaries,
        beneficiaryDetailInfo,
        interestBeneficiaries,
        getSelectedBeneficiaries,
        getBeneficiaryDetail,
        getInterestBeneficiary,
        loading,
        error,
      }}
    >
      {children}
    </BeneficiaryContext.Provider>
  );
};
