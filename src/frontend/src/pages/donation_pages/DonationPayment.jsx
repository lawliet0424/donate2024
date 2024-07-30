import "./DonationPayment.css";
import PaymentMethod from "../../components/PaymentMethod";
import PaymentReceipt from "../../components/PaymentReceipt";
import React, { useState } from "react";
import KeyValueInfo from "../../components/KeyValueInfo";

const DonationPayment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handlePaymentMethodClick = (methodName) => {
    setSelectedPaymentMethod(methodName);
  };

  return (
    <div className="DonationPayment">
      <div className="title">결제하기</div>
      <div className="donationPaymentContent">
        <div className="donationPaymentLeft">
          <div className="donorInfo">
            <div className="donorInfoTitle">기부자 정보</div>
            <KeyValueInfo keyInfo={"이름"} valueInfo={"기부자"} />
            <KeyValueInfo keyInfo={"이름"} valueInfo={"기부자"} />
            <KeyValueInfo keyInfo={"이름"} valueInfo={"기부자"} />
            <KeyValueInfo keyInfo={"이름"} valueInfo={"기부자"} />
          </div>
          <div className="paymentMethodList">
            <div className="paymentMethodTitle">결제 수단</div>
            <PaymentMethod
              methodName={"카드결제"}
              isPaymentMethodSelected={selectedPaymentMethod === "카드결제"} // boolean 값으로 전달
              onClick={() => handlePaymentMethodClick("카드결제")} // onClick 핸들러 전달
            />
            <PaymentMethod
              methodName={"무통장입금"}
              isPaymentMethodSelected={selectedPaymentMethod === "무통장입금"} // boolean 값으로 전달
              onClick={() => handlePaymentMethodClick("무통장입금")} // onClick 핸들러 전달
            />
            <PaymentMethod
              methodName={"기타결제"}
              isPaymentMethodSelected={selectedPaymentMethod === "기타결제"} // boolean 값으로 전달
              onClick={() => handlePaymentMethodClick("기타결제")} // onClick 핸들러 전달
            />
          </div>
        </div>
        <div className="donationPaymentRight">
          <PaymentReceipt
            numberOfBeneficiaries={"3"}
            donationAmountPerPerson={"10000"}
          />
        </div>
      </div>
    </div>
  );
};

export default DonationPayment;
