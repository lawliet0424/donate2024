import "./PaymentMethod.css";
import React from "react";

const PaymentMethod = ({ methodName, isPaymentMethodSelected, onClick }) => {
  const buttonClass = `PaymentMethod ${
    isPaymentMethodSelected ? `PaymentMethod--selected` : ""
  }`;
  return (
    <button onClick={onClick} className={buttonClass}>
      <div className="PaymentMethod__name">{methodName}</div>
    </button>
  );
};

export default PaymentMethod;
