import "./PaymentReceipt.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import ColoredButton from "../components/ColoredButton";

const PaymentReceipt = ({ numberOfBeneficiaries, donationAmountPerPerson }) => {
  const navigate = useNavigate();

  const onClickPaymentButton = () => {
    navigate("/donation/done");
  };

  const totalAmount = numberOfBeneficiaries * donationAmountPerPerson;

  return (
    <div className="PaymentReceipt">
      <div className="PaymentReceiptTitle">최종 결제 금액</div>
      <div className="infoRow">
        <div className="leftvalue">수혜 인원</div>
        <div className="rightvalue">{numberOfBeneficiaries} 명</div>
      </div>
      <div className="infoRow">
        <div className="leftvalue">인당 기부 금액</div>
        <div className="rightvalue">{donationAmountPerPerson} 원</div>
      </div>
      <div className="divider" />
      <div className="result">총 {totalAmount} 원</div>
      <ColoredButton
        text="결제하기"
        onClick={onClickPaymentButton}
        colorScheme="Orange"
      />
    </div>
  );
};

export default PaymentReceipt;
