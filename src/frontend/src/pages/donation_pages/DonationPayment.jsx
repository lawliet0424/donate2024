import "./DonationPayment.css"; // CSS 파일 임포트
import React, { useState, useEffect } from "react"; // React 및 필요한 훅 임포트
import { useNavigate, useLocation } from "react-router-dom"; // React Router의 navigate 및 location 훅 임포트
import PaymentMethod from "../../components/PaymentMethod"; // 결제 수단 컴포넌트 임포트
import PaymentReceipt from "../../components/PaymentReceipt"; // 결제 영수증 컴포넌트 임포트
import useAuth from "../../hooks/useAuth"; // 인증 훅 임포트
import usePayment from "../../hooks/usePayment"; // 결제 훅 임포트
import { formatPhoneNumber } from "../../utils/FormatValidate"; // 전화번호 포맷 유틸리티 임포트

/*
Function name: DonationPayment
Summary: 기부 결제 페이지 컴포넌트
Parameter: N/A
Return: 총 1개; 기부 결제 페이지 컴포넌트
Caller: N/A
Date: 2024-09-22
Write by: 길정수
*/
const DonationPayment = () => {
  const navigate = useNavigate(); // navigate 훅 사용
  const location = useLocation(); // 현재 위치 가져오기
  const { user } = useAuth(); // 사용자 정보 가져오기
  const { submitPayment } = usePayment(); // 결제 처리 훅 가져오기
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); // 선택된 결제 수단 상태
  const [isMethodSelected, setIsMethodSelected] = useState(false); // 결제 수단 선택 여부 상태
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  const {
    numberOfPeople,
    amount,
    amountPerPerson,
    fromThirdStep,
    selectedBeneficiaryList,
  } = location.state || {}; // 위치에서 상태 가져오기

  useEffect(() => {
    if (!fromThirdStep) {
      window.alert("잘못된 접근입니다. 홈으로 이동합니다."); // 잘못된 접근 시 경고 메시지
      navigate("/"); // 홈으로 이동
      return;
    }
  }, [fromThirdStep, navigate]);

  const handlePaymentMethodClick = (methodName) => {
    setSelectedPaymentMethod(methodName); // 선택된 결제 수단 설정
    setIsMethodSelected(true); // 결제 수단 선택 상태 업데이트
  };

  // 결제 처리 중 뒤로가기 방지
  useEffect(() => {
    if (loading) {
      // 히스토리 상태 추가
      window.history.pushState(null, null, window.location.href);

      const handlePopState = (event) => {
        window.alert("결제 처리 중에는 뒤로가기를 할 수 없습니다."); // 뒤로가기 방지 경고
        window.history.pushState(null, null, window.location.href); // 다시 현재 페이지 상태로
      };

      window.addEventListener("popstate", handlePopState); // popstate 이벤트 리스너 추가

      return () => {
        window.removeEventListener("popstate", handlePopState); // 컴포넌트 언마운트 시 리스너 제거
      };
    }
  }, [loading]);

  const onClickPaymentButton = async () => {
    if (!isMethodSelected) {
      window.alert("결제 수단을 선택하세요."); // 결제 수단 미선택 시 경고
      return;
    }

    setLoading(true); // 로딩 시작
    navigate("/loading"); // 로딩 페이지로 이동

    try {
      await submitPayment(
        numberOfPeople,
        amountPerPerson,
        selectedBeneficiaryList,
      ); // 결제 처리 요청
      navigate("/donation/done", {
        state: {
          numberOfPeople,
          amount,
          amountPerPerson,
        },
      }); // 결제 완료 페이지로 이동
    } catch (error) {
      window.alert("결제 중 오류가 발생했습니다."); // 결제 오류 경고
      navigate("/error"); // 에러 페이지로 이동
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    <div className="donation-payment">
      <div className="donation-payment__title">결제하기</div>{" "}
      {/* 페이지 제목 */}
      <div className="donation-payment__content">
        <div className="donation-payment__content--left">
          <div className="donorInfo">
            <div className="donation-payment__title--sub">기부자 정보</div>{" "}
            {/* 기부자 정보 제목 */}
            <div className="donation-payment__info">
              <div className="donation-payment__info--left">
                <div>이름</div> {/* 이름 */}
                <div>전화번호</div> {/* 전화번호 */}
                <div>메일</div> {/* 이메일 */}
              </div>
              <div className="donation-payment__info--right">
                <div>{user.donorName}</div> {/* 기부자 이름 */}
                <div>{formatPhoneNumber(user.donorPhoneNumber)}</div>{" "}
                {/* 포맷된 전화번호 */}
                <div>{user.donorEmail}</div> {/* 기부자 이메일 */}
              </div>
            </div>
          </div>
          <div className="donation-payment__method">
            <div className="donation-payment__title--sub">결제 수단</div>{" "}
            {/* 결제 수단 제목 */}
            <PaymentMethod
              methodName={"카드결제"}
              isPaymentMethodSelected={selectedPaymentMethod === "카드결제"} // 카드 결제 선택 여부
              onClick={() => handlePaymentMethodClick("카드결제")} // 카드 결제 클릭 핸들러
            />
            <PaymentMethod
              methodName={"무통장입금"}
              isPaymentMethodSelected={selectedPaymentMethod === "무통장입금"} // 무통장입금 선택 여부
              onClick={() => handlePaymentMethodClick("무통장입금")} // 무통장입금 클릭 핸들러
            />
            <PaymentMethod
              methodName={"기타결제"}
              isPaymentMethodSelected={selectedPaymentMethod === "기타결제"} // 기타결제 선택 여부
              onClick={() => handlePaymentMethodClick("기타결제")} // 기타결제 클릭 핸들러
            />
          </div>
        </div>
        <div className="donation-payment__content--right">
          <PaymentReceipt
            numberOfBeneficiaries={numberOfPeople} // 수혜자 수
            donationAmountPerPerson={amountPerPerson} // 수혜자당 기부 금액
            totalAmount={amount} // 총 기부 금액
            onClickPaymentButton={onClickPaymentButton} // 결제 버튼 클릭 핸들러
          />
        </div>
      </div>
    </div>
  );
};

export default DonationPayment; // DonationPayment 컴포넌트 내보내기