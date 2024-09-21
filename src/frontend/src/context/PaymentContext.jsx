import React, { createContext, useState } from "react";
import axios from "axios";

// 결제 관련 컨텍스트 생성
export const PaymentContext = createContext();

/*
  Function name: PaymentProvider
  Summary: 결제 상태를 관리하고 제공하는 컨텍스트 프로바이더
  Parameter: 총 1개
             node children; 자식 컴포넌트를 포함하는 JSX 요소
  Return: 총 1개; 결제 상태를 제공하는 JSX Provider 컴포넌트
  Date: 2024.09.21
  Write by: 길정수
*/
export const PaymentProvider = ({ children }) => {
  const [paymentStatus, setPaymentStatus] = useState(null); // 결제 상태

  /*
    Function name: submitPayment
    Summary: 결제를 서버에 요청하고 결제 상태를 업데이트하는 함수
    Parameter: 총 3개
               number numberOfPeople; 수혜 인원 수
               number amountPerPerson; 인당 기부 금액
               array selectedBeneficiaryList; 선택된 수혜자 리스트
    Return: 성공 시 서버 응답 데이터; 실패 시 오류를 발생시킴
  */
  const submitPayment = async (
    numberOfPeople,
    amountPerPerson,
    selectedBeneficiaryList
  ) => {
    try {
      // 서버에 결제 요청
      const response = await axios.post("/api/payment/submit", {
        numberOfPeople,
        amountPerPerson,
        selectedBeneficiaryList,
      });

      if (response.status === 200) {
        setPaymentStatus("success"); // 결제 성공 시 상태 업데이트
        return response.data; // 서버 응답 데이터 반환
      } else {
        setPaymentStatus("error"); // 결제 실패 시 상태 업데이트
        throw new Error("결제 실패"); // 오류 발생
      }
    } catch (error) {
      console.error("결제 중 오류 발생:", error);
      setPaymentStatus("error"); // 오류 발생 시 상태 업데이트
      throw error; // 오류를 다시 던짐
    }
  };

  return (
    <PaymentContext.Provider value={{ submitPayment, paymentStatus }}>
      {children} {/* 자식 컴포넌트를 렌더링 */}
    </PaymentContext.Provider>
  );
};
