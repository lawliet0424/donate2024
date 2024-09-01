import { useContext } from "react";
import { BeneficiaryContext } from "../context/BeneficiaryContext";

const useBeneficiary = () => {
  const {
    beneficiaries,
    selectedBeneficiary,
    getBeneficiaryById,
    loading,
    error,
  } = useContext(BeneficiaryContext);
  return {
    beneficiaries,
    selectedBeneficiary,
    getBeneficiaryById,
    loading,
    error,
  };
};

export default useBeneficiary;
