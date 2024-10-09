import { useContext } from "react";
import { BeneficiaryContext } from "../context/BeneficiaryContext";

// 수혜자 관련 정보를 제공하는 커스텀 훅
const useBeneficiary = () => {
  // BeneficiaryContext에서 수혜자 관련 정보 및 메서드 가져오기
  const {
    beneficiaryInfo,  // 수혜자 정보 통합 상태
    getSelectedBeneficiaries, // 선택된 수혜자를 가져오는 함수
    getBeneficiaryDetail, // 수혜자 상세 정보를 가져오는 함수
    getInterestBeneficiary, // 관심 수혜자를 가져오는 함수
    toggleInterestAboutBeneficiary,
    loading, // 로딩 상태
    error, // 에러 상태
  } = useContext(BeneficiaryContext); // BeneficiaryContext 사용

  // 필요한 값들을 반환
  return {
    beneficiaryInfo,
    getSelectedBeneficiaries,
    getBeneficiaryDetail,
    getInterestBeneficiary,
    toggleInterestAboutBeneficiary,
    loading,
    error,
  };
};

export default useBeneficiary; // 훅 내보내기
