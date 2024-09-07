import { useContext } from "react";
import { BeneficiaryContext } from "../context/BeneficiaryContext";

const useBeneficiary = () => {
  const {
    beneficiaries,
    getSelectedBeneficiary,
    getBeneficiaryDetail,
    getInterestBeneficiary,
    getBeneficiaryById,
    loading,
    error,
  } = useContext(BeneficiaryContext);
  return {
    beneficiaries,
    getSelectedBeneficiary,
    getBeneficiaryDetail,
    getInterestBeneficiary,
    getBeneficiaryById,
    loading,
    error,
  };
};

export default useBeneficiary;
