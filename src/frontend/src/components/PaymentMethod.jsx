import "./PaymentMethod.css";
import React from "react";

const PaymentMethod = ({
  methodIcon,
  methodName,
  isPaymentMethodSelected,
  onClick,
}) => {
  const buttonClass = `PaymentMethod ${
    isPaymentMethodSelected ? `PaymentMethod--selected` : ""
  }`;
  return (
    <button onClick={onClick} className={buttonClass}>
      {methodName}
    </button>
  );
};

export default PaymentMethod;
