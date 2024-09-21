import "./MyInterest.css"; // 스타일시트 임포트
import React from "react"; // React 라이브러리 임포트
import BeneficiaryBox from "../../components/BeneficiaryBox"; // 수혜자 박스 컴포넌트 임포트
import useBeneficiary from "../../hooks/useBeneficiary"; // 수혜자 훅 임포트

/*
Function name: MyInterest
Summary: 사용자의 관심 수혜자 목록을 표시하는 컴포넌트
Parameter: 총 0개
Return: 총 1개; MyInterest 컴포넌트
Caller: React 애플리케이션의 렌더링 과정
Date: 2024-09-22
Write by: 길정수 
*/
const MyInterest = () => {
  const { interestBeneficiaries } = useBeneficiary(); // 관심 수혜자 목록을 가져옴

  return (
    <div className="my-interest">
      {" "}
      {/* 관심 수혜자 컴포넌트 래퍼 */}
      <div className="my-interest__title">나의 관심 수혜자</div>{" "}
      {/* 제목 표시 */}
      <div className="my-interest__beneficiaryLists">
        {" "}
        {/* 수혜자 목록 래퍼 */}
        {interestBeneficiaries.map(
          (
            beneficiary // 관심 수혜자를 맵핑하여 BeneficiaryBox 생성
          ) => (
            <BeneficiaryBox
              key={beneficiary.beneficiaryId} // 고유한 키로 수혜자 ID 사용
              beneficiaryId={beneficiary.beneficiaryId} // BeneficiaryBox에 ID 전달
            />
          )
        )}
      </div>
    </div>
  );
};

export default MyInterest; // MyInterest 컴포넌트 내보내기
