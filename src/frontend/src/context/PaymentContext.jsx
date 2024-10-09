import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { authAxios } from './AuthContext';
import { AuthContext } from './AuthContext';  // AuthContext 임포트


// 결제 관련 컨텍스트 생성
export const PaymentContext = createContext();

const timeoutPromise = (ms) => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("결제되었으나, 토큰 전송에 과도한 시간이 걸리고 있습니다.")), ms);
  });
};

export const PaymentProvider = ({ children }) => {
  const [paymentStatus, setPaymentStatus] = useState(null); // 결제 상태
  const { user } = useContext(AuthContext); // AuthContext에서 사용자 정보 가져오기


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
  ) => {
    // 결제 요청 데이터 구성
    const paymentData = {
      personnel: numberOfPeople,
      perPerson: amountPerPerson,
      beneficiaryList: selectedBeneficiaryList,
    };

    try {
      // 서버에 결제 요청
      console.log(paymentData);
      const response = await Promise.race([
                                   authAxios.post("/api/payment/submit", paymentData),
                                   timeoutPromise(3000000)
                                 ]);
      // 결제 성공 여부 확인
      if (response.status == 200) {
        setPaymentStatus("success"); // 결제 성공
        return response.data;
      } else {
        throw new Error(response.data.message || "결제 실패");
      }
    } catch (error) {
        if (error.message === "요청 시간이 초과되었습니다.") {
            setPaymentStatus("timeout"); // 타임아웃 상태 업데이트
          } else {
            console.error("결제 중 오류 발생:", error);
            setPaymentStatus("error");
          }
          throw error; // 에러를 다시 던져서 호출한 쪽에서 처리할 수 있게 함
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
