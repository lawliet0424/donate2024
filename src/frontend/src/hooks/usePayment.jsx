import { useContext } from "react";
import { PaymentContext } from "../context/PaymentContext";

// 결제 관련 정보를 제공하는 커스텀 훅
const usePayment = () => {
  // PaymentContext에서 결제 관련 상태 및 함수를 가져오기
  const {
    submitPayment, // 결제를 제출하는 함수
    paymentStatus, // 현재 결제 상태
  } = useContext(PaymentContext); // PaymentContext 사용

  // 필요한 값들을 반환
  return {
    submitPayment,
    paymentStatus,
  };
};

export default usePayment; // 훅 내보내기
