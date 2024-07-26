import "./PaymentReceipt.css";
import React from "react";
import ColoredButton from "../components/ColoredButton";
import { useNavigate } from "react-router-dom";

const PaymentReceipt = ({ numberOfBeneficiaries, donationAmountPerPerson }) => {
  const nav = useNavigate();

  const onClickPaymentButton = () => {
    nav("/donation/done");
  };

  const totalAmount = numberOfBeneficiaries * donationAmountPerPerson;

  return (
    <div className="PaymentReceipt">
      <div className="PaymentReceiptTitle">최종 결제 금액</div>
      <div className="infoRow">
        <div className="left">수혜 인원</div>
        <div className="right">{numberOfBeneficiaries} 명</div>
      </div>
      <div className="infoRow">
        <div className="left">인당 기부 금액</div>
        <div className="right">{donationAmountPerPerson} 원</div>
      </div>
      <div className="divider" />
      <div className="result">총 {totalAmount} 원</div>
      <ColoredButton
        text={"결제하기"}
        onClick={onClickPaymentButton}
        type={"Orange"}
      />
    </div>
  );
};

export default PaymentReceipt;
