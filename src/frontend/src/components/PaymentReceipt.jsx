import "./PaymentReceipt.css";
import React from "react";
import ColoredButton from "../components/ColoredButton";

const PaymentReceipt = ({
  numberOfBeneficiaries,
  donationAmountPerPerson,
  totalAmount,
  onClickPaymentButton,
}) => {
  const feeAmount =
    totalAmount - numberOfBeneficiaries * donationAmountPerPerson;

  return (
    <div className="PaymentReceipt">
      <div className="PaymentReceipt__title">최종 결제 금액</div>
      <div className="PaymentReceipt__infoRow">
        <div className="PaymentReceipt__leftvalue">수혜 인원</div>
        <div className="PaymentReceipt__rightvalue">
          {numberOfBeneficiaries.toLocaleString()} 명
        </div>
      </div>
      <div className="PaymentReceipt__infoRow">
        <div className="PaymentReceipt__leftvalue">인당 기부 금액</div>
        <div className="PaymentReceipt__rightvalue">
          {donationAmountPerPerson.toLocaleString()} 원
        </div>
      </div>
      <div className="PaymentReceipt__infoRow">
        <div className="PaymentReceipt__leftvalue">수수료</div>
        <div className="PaymentReceipt__rightvalue">
          {feeAmount.toLocaleString()} 원
        </div>
      </div>
      <div className="PaymentReceipt__divider" />
      <div className="PaymentReceipt__result">
        총 {totalAmount.toLocaleString()} 원
      </div>
      <ColoredButton
        text="결제하기"
        onClick={onClickPaymentButton}
        colorScheme="orange"
        className="PaymentReceipt__paymentButton"
      />
    </div>
  );
};

export default PaymentReceipt;
