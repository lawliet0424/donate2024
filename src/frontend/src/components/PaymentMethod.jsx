import "./PaymentMethod.css";
import React from "react";

/*
  Function name: PaymentMethod
  Summary: 결제 수단 선택 버튼 컴포넌트
  Parameter: 총 3개
             string methodName; 결제 수단 이름
             boolean isPaymentMethodSelected; 결제 수단이 선택되었는지 여부
             function onClick; 결제 수단 클릭 시 호출되는 함수
  Return: 총 1개; 결제 수단 버튼을 포함한 JSX 컴포넌트
  Caller: 결제 관련 컴포넌트에서 호출 가능
  Date: 2024.09.21
  Write by: 길정수
*/
const PaymentMethod = ({ methodName, isPaymentMethodSelected, onClick }) => {
  /*
    동적으로 결제 수단 버튼의 클래스명 설정
  */
  const buttonClass = `PaymentMethod ${
    isPaymentMethodSelected ? `PaymentMethod--selected` : ""
  }`;

  /*
    JSX: 결제 수단 이름을 표시하는 버튼 컴포넌트 구조
  */
  return (
    <button onClick={onClick} className={buttonClass}>
      <div className="PaymentMethod__name">{methodName}</div>
    </button>
  );
};

export default PaymentMethod;
