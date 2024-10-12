import "./MyInterest.css"; // 스타일시트 임포트
import React, { useEffect, useState } from "react"; // React 및 필요한 훅 임포트
import BeneficiaryBox from "../../components/BeneficiaryBox"; // 수혜자 박스 컴포넌트 임포트
import useBeneficiary from "../../hooks/useBeneficiary"; // 수혜자 훅 임포트
import ColoredButton from "../../components/ColoredButton"; // 컬러 버튼 컴포넌트 임포트
import { useNavigate } from "react-router-dom"; // React Router의 navigate 및 location 훅 임포트



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
  const { beneficiaryInfo, getInterestBeneficiary } = useBeneficiary();
  const [refreshTrigger, setRefreshTrigger] = useState(false);

    const navigate = useNavigate(); // navigate 훅 사용

    const onHomeButtonClicked = () => {
      navigate("/"); // 메인으로 버튼 클릭 시 이동
    };

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        await getInterestBeneficiary();
      } catch (err) {
        console.log("(myinterest) 관심 수혜자 로딩 실패", err);
      }
    };
    fetchBeneficiaries();
  }, [refreshTrigger]);

  const handleInterestChange = () => {
    setRefreshTrigger((prev) => !prev);
  };

  return (
    <div className="my-interest">
      {/* 관심 수혜자 컴포넌트 래퍼 */}
      <div className="my-interest__title">나의 관심 수혜자</div>
      {/* 제목 표시 */}
      <div className="my-interest__beneficiaryLists">
        {/* 수혜자 목록 래퍼 */}
        {beneficiaryInfo.length === 0 ? (
            <div className="my-interest__noBeneficiary">
          <div className="my-interest__noBeneficiary--message">관심을 가지고 있는 수혜자가 없습니다.</div>
          <ColoredButton
            text={"메인으로 가기"}
            colorScheme={"white"}
            onClick={onHomeButtonClicked} // 메인으로 버튼 클릭 시 호출
            className={"my-interest__noBeneficiary--button"}
          />
          </div>
        ) : (
          beneficiaryInfo.map((beneficiary) => (
            <BeneficiaryBox
              key={beneficiary.beneficiaryId} // 고유한 키로 수혜자 ID 사용
              beneficiaryId={beneficiary.beneficiaryId} // BeneficiaryBox에 ID 전달
              onInterestChange={handleInterestChange} // 콜백 전달
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MyInterest; // MyInterest 컴포넌트 내보내기
