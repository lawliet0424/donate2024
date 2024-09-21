import "./PaymentReceipt.css";
import React from "react";
import ColoredButton from "../components/ColoredButton";

/*
  Function name: PaymentReceipt
  Summary: 결제 영수증 컴포넌트
  Parameter: 총 4개
             number numberOfBeneficiaries; 수혜 인원
             number donationAmountPerPerson; 인당 기부 금액
             number totalAmount; 총 결제 금액
             function onClickPaymentButton; 결제하기 버튼 클릭 시 호출되는 함수
  Return: 총 1개; 결제 정보를 포함한 JSX 컴포넌트
  Caller: 결제 관련 컴포넌트에서 호출 가능
  Date: 2024.09.21
  Write by: 길정수
*/
const PaymentReceipt = ({
  numberOfBeneficiaries,
  donationAmountPerPerson,
  totalAmount,
  onClickPaymentButton,
}) => {
  /*
    수수료 계산: 총 결제 금액에서 수혜 인원 * 인당 기부 금액을 뺀 금액
  */
  const feeAmount =
    totalAmount - numberOfBeneficiaries * donationAmountPerPerson;

  /*
    JSX: 결제 정보 및 '결제하기' 버튼을 표시하는 컴포넌트 구조
  */
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
