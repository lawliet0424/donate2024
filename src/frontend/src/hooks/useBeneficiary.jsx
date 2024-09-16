import { useContext, useEffect } from "react";
import { BeneficiaryContext } from "../context/BeneficiaryContext";

const useBeneficiary = () => {
  const {
    selectedBeneficiaries,
    beneficiaryDetailInfo,
    interestBeneficiaries,
    getSelectedBeneficiaries,
    getBeneficiaryDetail,
    getInterestBeneficiary,
    loading,
    error,
  } = useContext(BeneficiaryContext);

  return {
    selectedBeneficiaries,
    beneficiaryDetailInfo,
    interestBeneficiaries,
    getSelectedBeneficiaries,
    getBeneficiaryDetail,
    getInterestBeneficiary,
    loading,
    error,
  };
};

export default useBeneficiary;
