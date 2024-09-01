import React, { createContext, useState, useEffect } from "react";
import { mockGetBeneficiary } from "../api";

export const BeneficiaryContext = createContext();

export const BeneficiaryProvider = ({ children }) => {
  const [beneficiaries, setBeneficiaries] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getBeneficiaryById = async (beneficiaryId, forceRefresh = false) => {
    // const beneficiary = beneficiaries[beneficiaryId];

    // if (
    //   !forceRefresh &&
    //   beneficiary &&
    //   Date.now() - beneficiary.lastUpdated < 60000
    // ) {
    //   return;
    // }

    // setLoading(true);

    // try {
    //   const data = await mockGetBeneficiary(beneficiaryId);

    //   setBeneficiaries((prev) => ({
    //     ...prev,
    //     [beneficiaryId]: {
    //       ...data,
    //       lastUpdated: Date.now(), // 데이터 마지막 업데이트 시간
    //     },
    //   }));
    // } catch (err) {
    //   console.error("Failed to load beneficiary", err);
    //   setError(err.message || "Failed to load beneficiary");
    // } finally {
    //   setLoading(false);
    // }
    //
    //

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
        getBeneficiaryById,
        loading,
        error,
      }}
    >
      {children}
    </BeneficiaryContext.Provider>
  );
};
