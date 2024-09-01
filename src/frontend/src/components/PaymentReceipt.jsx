import "./PaymentReceipt.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import ColoredButton from "../components/ColoredButton";

const PaymentReceipt = ({
  numberOfBeneficiaries,
  donationAmountPerPerson,
  totalAmount,
  isMethodSelected,
}) => {
  const navigate = useNavigate();

  const onClickPaymentButton = () => {
    if (!isMethodSelected) {
      window.alert("결제 수단을 선택하세요.");
      return;
    }
    console.log("결제정상완료");
    navigate("/donation/done", {
      state: {
        personnel: numberOfBeneficiaries,
        amount: totalAmount,
        perPerson: donationAmountPerPerson,
      },
    });
  };

  const feeAmount =
    totalAmount - numberOfBeneficiaries * donationAmountPerPerson;

  return (
    <div className="PaymentReceipt">
      <div className="PaymentReceipt__title">최종 결제 금액</div>
      <div className="infoRow">
        <div className="leftvalue">수혜 인원</div>
        <div className="rightvalue">
          {numberOfBeneficiaries.toLocaleString()} 명
        </div>
      </div>
      <div className="infoRow">
        <div className="leftvalue">인당 기부 금액</div>
        <div className="rightvalue">
          {donationAmountPerPerson.toLocaleString()} 원
        </div>
      </div>
      <div className="infoRow">
        <div className="leftvalue">수수료</div>
        <div className="rightvalue">{feeAmount.toLocaleString()} 원</div>
      </div>
      <div className="divider" />
      <div className="result">총 {totalAmount.toLocaleString()} 원</div>
      <ColoredButton
        text="결제하기"
        onClick={onClickPaymentButton}
        colorScheme="orange"
      />
    </div>
  );
};

export default PaymentReceipt;
