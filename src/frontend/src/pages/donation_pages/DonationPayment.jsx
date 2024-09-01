import "./DonationPayment.css";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PaymentMethod from "../../components/PaymentMethod";
// import PaymentMethodSelection from "../../components/PaymentMethodSelection";
import PaymentReceipt from "../../components/PaymentReceipt";
import { AuthContext } from "../../context/AuthContext";

const DonationPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isMethodSelected, setIsMethodSelected] = useState(false);

  const handlePaymentMethodClick = (methodName) => {
    setSelectedPaymentMethod(methodName);
    setIsMethodSelected(true);
  };

  const { personnel, amount, perPerson, fromThirdStep } = location.state || {};
  useEffect(() => {
    if (!fromThirdStep) {
      window.alert("잘못된 접근입니다. 홈으로 이동합니다.");
      navigate("/");
      return;
    }
  }, [fromThirdStep, navigate]);

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
                <div>{user.donorName}</div>
                <div>{user.donorPhone}</div>
                <div>{user.donorEmail}</div>
              </div>
            </div>
          </div>
          {/* <PaymentMethodSelection value={30000} /> */}
          <div className="paymentMethodList">
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
          </div>
        </div>
        <div className="donationPaymentRight">
          <PaymentReceipt
            numberOfBeneficiaries={personnel}
            donationAmountPerPerson={perPerson}
            totalAmount={amount}
            isMethodSelected={isMethodSelected}
          />
        </div>
      </div>
    </div>
  );
};

export default DonationPayment;
