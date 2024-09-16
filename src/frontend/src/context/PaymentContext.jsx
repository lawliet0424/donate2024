import React, { createContext, useState } from "react";
import axios from "axios";

export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [paymentStatus, setPaymentStatus] = useState(null);

  const submitPayment = async (
    numberOfPeople,
    amountPerPerson,
    selectedBeneficiaryList
  ) => {
    try {
      const response = await axios.post("/api/payment/submit", {
        numberOfPeople,
        amountPerPerson,
        selectedBeneficiaryList,
      });
      if (response.status === 200) {
        setPaymentStatus("success");
        return response.data;
      } else {
        setPaymentStatus("error");
        throw new Error("결제 실패");
      }
    } catch (error) {
      console.error("결제 중 오류 발생:", error);
      setPaymentStatus("error");
      throw error;
    }
  };

  return (
    <PaymentContext.Provider value={{ submitPayment, paymentStatus }}>
      {children}
    </PaymentContext.Provider>
  );
};
