import "./BeneficiaryBox.css";
import React, { useEffect, useCallback, useState } from "react";
import TransparentButton from "../components/TransparentButton";
import defaultProfileImage from "../assets/defaultProfile.png";
import filledHeart from "../assets/filledHeart.png";
import emptyHeart from "../assets/emptyHeart.png";
import useBeneficiary from "../hooks/useBeneficiary";
import Loading from "../pages/error_loading_pages/Loading.jsx";

/*
  Function name: BeneficiaryBox
  Summary: 특정 수혜자의 정보를 표시하는 컴포넌트
  Parameter: 총 2개
             string beneficiaryId; 수혜자 ID
             array selectedTags (선택); 선택된 태그 목록 (기본값: 빈 배열)
  Return: 총 1개; 수혜자 정보를 포함한 JSX 컴포넌트 반환
*/
const BeneficiaryBox = ({ beneficiaryId, selectedTags = [], onInterestChange }) => {
  // 수혜자 데이터를 가져오는 custom hook 사용
  const { beneficiaryInfo, loading, error, toggleInterestAboutBeneficiary } =
    useBeneficiary();

  // 관심 여부 상태를 관리하는 state
  const [isInterested, setIsInterested] = useState(false); // 초기값은 false로 설정

  // beneficiaryInfo에서 beneficiaryId에 해당하는 수혜자 정보를 찾아 초기 상태 설정
  useEffect(() => {
    const beneficiary = beneficiaryInfo.find(
      (b) => b.beneficiaryId === parseInt(beneficiaryId)
    );
    if (beneficiary) {
      setIsInterested(beneficiary.isInterested); // beneficiary 정보가 로드되면 isInterested 값 설정
    }
  }, [beneficiaryInfo, beneficiaryId]);

  /*
    Function name: handleToggleInterest
    Summary: 유저가 관심을 표시하거나 해제할 때 호출되는 함수
    Parameter: 없음
    Return: 없음
    Caller: BeneficiaryBox__button--interest
  */
  const handleToggleInterest = async () => {
    const previousState = isInterested; // 이전 상태 저장
    const updatedState = !isInterested; // 토글된 상태

    // UI 즉시 업데이트
    setIsInterested(updatedState);

    try {
      // 서버에 요청 보내기
      await toggleInterestAboutBeneficiary(beneficiaryId); // 서버 요청을 await

      // 부모 컴포넌트에서 콜백이 전달된 경우에만 호출
      if (onInterestChange) {
        onInterestChange();
      }
    } catch (error) {
      console.error("Failed to toggle interest:", error);
      setIsInterested(previousState); // 오류 발생 시 상태 롤백
    }
  };

  // 수혜자 데이터 로딩 중일 때 화면에 표시되는 메시지 처리
  if (loading && !beneficiaryInfo[beneficiaryId]) {
    return <Loading />;
  }

  // 에러 발생 시 화면에 표시되는 메시지 처리
  if (error) {
    return <p>Error: {error}</p>;
  }

  // 수혜자 정보가 없을 때 표시되는 메시지 처리
  const beneficiary = beneficiaryInfo.find(
    (b) => b.beneficiaryId === parseInt(beneficiaryId)
  );
  if (!beneficiary) {
    return <p>No beneficiary data available</p>;
  }

  // 수혜자 이미지가 없을 경우 기본 프로필 이미지 사용
  const imageSrc = defaultProfileImage;

  return (
    <div className="BeneficiaryBox">
      {/* 수혜자 프로필 이미지 */}
      <img
        className="BeneficiaryBox__profile"
        src={imageSrc}
        alt={beneficiary.beneficiaryName || "Beneficiary"}
      />
      <div className="BeneficiaryBox__details">
        <div className="BeneficiaryBox__header">
          {/* 수혜자 이름 표시 */}
          <div className="BeneficiaryBox__name">
            {beneficiary.beneficiaryName || "No Name"}
          </div>
          {/* 관심 버튼 */}
          <div
            className="BeneficiaryBox__button--interest"
            onClick={handleToggleInterest}
          >
            <img
              className="BeneficiaryBox__heart"
              src={isInterested ? filledHeart : emptyHeart}
              alt="Heart Icon"
            />
          </div>
        </div>
        {/* 수혜자 태그 섹션 */}
        <div className="BeneficiaryBox__tag__section">
          {beneficiary.beneficiaryTags &&
          beneficiary.beneficiaryTags.length > 0 ? (
            beneficiary.beneficiaryTags.map((tag) => (
              <div
                key={tag.id}
                className={`BeneficiaryBox__tag ${
                  selectedTags.includes(tag.id)
                    ? "BeneficiaryBox__tag--selected"
                    : ""
                }`}
              >
                #{tag.name}
              </div>
            ))
          ) : (
            <div className="BeneficiaryBox__tag">No Tags</div>
          )}
        </div>
      </div>
      {/* 상세 페이지로 이동하는 버튼 */}
      <TransparentButton
        text="> 상세 페이지"
        onClick={() => window.open(`/beneficiary/${beneficiaryId}`, "_blank")}
      />
    </div>
  );
};

export default BeneficiaryBox;
