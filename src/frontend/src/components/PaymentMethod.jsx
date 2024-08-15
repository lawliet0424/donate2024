import "./PaymentMethod.css";
import React from "react";

const PaymentMethod = ({
  methodIcon,
  methodName,
  isPaymentMethodSelected,
  onClick,
}) => {
  return (
    <div
      className={`PaymentMethod ${isPaymentMethodSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div className="methodName">{methodName}</div>
    </div>
  );
};

export default PaymentMethod;
