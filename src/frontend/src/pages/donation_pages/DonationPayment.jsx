import "./DonationPayment.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PaymentMethod from "../../components/PaymentMethod";
// import PaymentMethodSelection from "../../components/PaymentMethodSelection";
import PaymentReceipt from "../../components/PaymentReceipt";
import useAuth from "../../hooks/useAuth";
import usePayment from "../../hooks/usePayment";
import { formatPhoneNumber } from "../../utils/FormatValidate";

const DonationPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { submitPayment } = usePayment();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isMethodSelected, setIsMethodSelected] = useState(false);
  const [loading, setLoading] = useState(false); // loading 상태 추가

  const {
    numberOfPeople,
    amount,
    amountPerPerson,
    fromThirdStep,
    selectedBeneficiaryList,
  } = location.state || {};
  useEffect(() => {
    if (!fromThirdStep) {
      window.alert("잘못된 접근입니다. 홈으로 이동합니다.");
      navigate("/");
      return;
    }
  }, [fromThirdStep, navigate]);

  const handlePaymentMethodClick = (methodName) => {
    setSelectedPaymentMethod(methodName);
    setIsMethodSelected(true);
  };

  // 결제 처리 중 뒤로가기 방지
  useEffect(() => {
    if (loading) {
      // 히스토리 상태 추가
      window.history.pushState(null, null, window.location.href);

      const handlePopState = (event) => {
        window.alert("결제 처리 중에는 뒤로가기를 할 수 없습니다.");
        window.history.pushState(null, null, window.location.href); // 다시 현재 페이지 상태로
      };

      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [loading]);

  const onClickPaymentButton = async () => {
    if (!isMethodSelected) {
      window.alert("결제 수단을 선택하세요.");
      return;
    }

    setLoading(true); // 로딩 시작
    navigate("/loading"); // 로딩 페이지로 이동

    try {
      await submitPayment(
        numberOfPeople,
        amountPerPerson,
        selectedBeneficiaryList
      );
      navigate("/donation/done", {
        state: {
          numberOfPeople,
          amount,
          amountPerPerson,
        },
      });
    } catch (error) {
      window.alert("결제 중 오류가 발생했습니다.");
      navigate("/error"); // 결제 중 오류 시 에러 페이지로 이동
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    <div className="donation-payment">
      <div className="donation-payment__title">결제하기</div>
      <div className="donation-payment__content">
        <div className="donation-payment__content--left">
          <div className="donorInfo">
            <div className="donation-payment__title--sub">기부자 정보</div>
            <div className="donation-payment__info">
              <div className="donation-payment__info--left">
                <div>이름</div>
                <div>전화번호</div>
                <div>메일</div>
              </div>
              <div className="donation-payment__info--right">
                <div>{user.donorName}</div>
                <div>{formatPhoneNumber(user.donorPhoneNumber)}</div>
                <div>{user.donorEmail}</div>
              </div>
            </div>
          </div>
          {/* <PaymentMethodSelection value={30000} /> */}
          <div className="donation-payment__method">
            <div className="donation-payment__title--sub">결제 수단</div>
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
        <div className="donation-payment__content--right">
          <PaymentReceipt
            numberOfBeneficiaries={numberOfPeople}
            donationAmountPerPerson={amountPerPerson}
            totalAmount={amount}
            onClickPaymentButton={onClickPaymentButton}
          />
        </div>
      </div>
    </div>
  );
};

export default DonationPayment;
