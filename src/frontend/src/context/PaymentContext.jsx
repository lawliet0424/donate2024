import React, { createContext, useState } from "react";
import axios from "axios";

// 결제 관련 컨텍스트 생성
export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [paymentStatus, setPaymentStatus] = useState(null); // 결제 상태

  /*
    Function name: submitPayment
    Summary: 결제를 서버에 요청하고 결제 상태를 업데이트하는 함수
    Parameter: 총 4개
               number numberOfPeople; 수혜 인원 수
               number amountPerPerson; 인당 기부 금액
               array selectedBeneficiaryList; 선택된 수혜자 리스트
               string donorId; 기부자 ID
    Return: 성공 시 서버 응답 데이터; 실패 시 오류를 발생시킴
  */
  const submitPayment = async (
    numberOfPeople,
    amountPerPerson,
    selectedBeneficiaryList,
    donorId
  ) => {
    // 결제 요청 데이터 구성
    const paymentData = {
      personnel: numberOfPeople,
      perPerson: amountPerPerson,
      beneficiaryList: selectedBeneficiaryList,
      donorId: "test1",
    };

    try {
      // 서버에 결제 요청
      console.log(paymentData);
      const response = await axios.post("/api/payment/submit", paymentData);

      // 결제 성공 여부 확인
      if (response.data.message === "ok") {
        setPaymentStatus("success"); // 결제 성공
        return response.data;
      } else {
        throw new Error(response.data.message || "결제 실패");
      }
    } catch (error) {
      console.error("결제 중 오류 발생:", error);
      setPaymentStatus("error"); // 결제 실패 시 상태 업데이트
      throw error; // 에러를 다시 던져서 호출한 쪽에서 처리할 수 있게 함
    }
  };

  return (
    <PaymentContext.Provider value={{ submitPayment, paymentStatus }}>
      {children} {/* 자식 컴포넌트를 렌더링 */}
    </PaymentContext.Provider>
  );
};
