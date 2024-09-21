import "./BeneficiaryBox.css";
import React, { useEffect, useCallback } from "react";
import TransparentButton from "../components/TransparentButton";
import defaultProfileImage from "../assets/defaultProfile.png";
import filledHeart from "../assets/filledHeart.png";
import emptyHeart from "../assets/emptyHeart.png";
import useBeneficiary from "../hooks/useBeneficiary";
import useInterest from "../hooks/useInterest";

/*
  Function name: BeneficiaryBox
  Summary: 특정 수혜자의 정보를 표시하는 컴포넌트
  Parameter: 총 2개
             string beneficiaryId; 수혜자 ID
             array selectedTags (선택); 선택된 태그 목록 (기본값: 빈 배열)
  Return: 총 1개; 수혜자 정보를 포함한 JSX 컴포넌트 반환
  Caller: 다른 컴포넌트에서 호출 가능
  Date: 2024.09.21
  Write by: 길정수
*/
const BeneficiaryBox = ({ beneficiaryId, selectedTags = [] }) => {
  // 수혜자 데이터를 가져오는 custom hook 사용
  const { beneficiaries, getBeneficiaryById, loading, error } =
    useBeneficiary();
  // 유저의 관심 태그를 관리하는 custom hook 사용
  const { userInterests, toggleInterest } = useInterest();
  // 현재 수혜자가 관심 목록에 포함되어 있는지 확인
  const isInterested = userInterests.includes(beneficiaryId);

  /*
    Function name: useEffect
    Summary: 수혜자 정보가 없는 경우 서버에서 데이터를 가져오는 함수
    Parameter: 총 1개
              array [beneficiaryId, beneficiaries, getBeneficiaryById]; 의존성 배열
    Return: 없음
    Caller: 내부에서 자동 실행
    Date: 2024.09.21
    Write by: 길정수
  */
  useEffect(() => {
    if (!beneficiaries[beneficiaryId]) {
      getBeneficiaryById(beneficiaryId);
    }
  }, [beneficiaryId, beneficiaries, getBeneficiaryById]);

  /*
    Function name: handleToggleInterest
    Summary: 유저가 관심을 표시하거나 해제할 때 호출되는 함수
    Parameter: 없음
    Return: 없음
    Caller: BeneficiaryBox__button--interest
    Date: 2024.09.21
    Write by: 길정수
  */
  const handleToggleInterest = useCallback(() => {
    toggleInterest(beneficiaryId);
  }, [beneficiaryId, toggleInterest]);

  // 수혜자 데이터 로딩 중일 때 화면에 표시되는 메시지 처리
  if (loading && !beneficiaries[beneficiaryId]) {
    return <p>Loading...</p>;
  }

  // 에러 발생 시 화면에 표시되는 메시지 처리
  if (error) {
    return <p>Error: {error}</p>;
  }

  // 수혜자 정보가 없을 때 표시되는 메시지 처리
  const selectedBeneficiary = beneficiaries[beneficiaryId];
  if (!selectedBeneficiary) {
    return <p>No beneficiary data available</p>;
  }

  // 수혜자 이미지가 없을 경우 기본 프로필 이미지 사용
  const imageSrc =
    selectedBeneficiary.beneficiaryProfileImg || defaultProfileImage;

  /*
    JSX: 수혜자 정보를 화면에 표시하는 컴포넌트 구조
  */
  return (
    <div className="BeneficiaryBox">
      {/* 수혜자 프로필 이미지 */}
      <img
        className="BeneficiaryBox__profile"
        src={imageSrc}
        alt={selectedBeneficiary.beneficiaryName || "Beneficiary"}
      />
      <div className="BeneficiaryBox__details">
        <div className="BeneficiaryBox__header">
          {/* 수혜자 이름 표시 */}
          <div className="BeneficiaryBox__name">
            {selectedBeneficiary.beneficiaryName || "No Name"}
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
          {selectedBeneficiary.beneficiaryTags &&
          selectedBeneficiary.beneficiaryTags.length > 0 ? (
            selectedBeneficiary.beneficiaryTags.map((tag) => (
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
