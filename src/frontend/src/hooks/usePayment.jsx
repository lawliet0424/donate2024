import { useContext } from "react";
import { PaymentContext } from "../context/PaymentContext";

const usePayment = () => {
  const { submitPayment, paymentStatus } = useContext(PaymentContext);
  return { submitPayment, paymentStatus };
};

export default usePayment;
