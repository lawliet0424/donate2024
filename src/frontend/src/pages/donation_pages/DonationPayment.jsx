import "./DonationPayment.css";
import React, { useState } from "react";
// import PaymentMethod from "../../components/PaymentMethod";
import PaymentMethodSelection from "../../components/PaymentMethodSelection";
import PaymentReceipt from "../../components/PaymentReceipt";

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
            <div className="donorInfoContent">
              <div className="donorInfoLeft">
                <div>이름</div>
                <div>전화번호</div>
                <div>메일</div>
              </div>
              <div className="donorInfoRight">
                <div>기부자</div>
                <div>010-1234-5678</div>
                <div>dfhdfjlk@gmail.com</div>
              </div>
            </div>
          </div>
          <PaymentMethodSelection value={30000} />
          {/* <div className="paymentMethodList">
            <div className="paymentMethodTitle">결제 수단</div>
            <PaymentMethod
              methodName={"카드결제"}
              isPaymentMethodSelected={selectedPaymentMethod === "카드결제"}
              onClick={() => handlePaymentMethodClick("카드결제")}
            />
            <PaymentMethod
              methodName={"무통장입금"}
              isPaymentMethodSelected={selectedPaymentMethod === "무통장입금"}
              onClick={() => handlePaymentMethodClick("무통장입금")}
            />
            <PaymentMethod
              methodName={"기타결제"}
              isPaymentMethodSelected={selectedPaymentMethod === "기타결제"}
              onClick={() => handlePaymentMethodClick("기타결제")}
            />
          </div> */}
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
