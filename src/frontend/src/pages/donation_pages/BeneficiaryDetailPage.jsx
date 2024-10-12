import "./BeneficiaryDetailPage.css"; // CSS 파일 임포트
import React, { useEffect, useState, useCallback } from "react"; // React 및 useEffect 훅 임포트
import { useParams } from "react-router-dom"; // URL 파라미터 가져오기
import backgroundImage from "../../assets/exampleImg.png"; // 기본 배경 이미지 임포트
import defaultProfileImage from "../../assets/defaultProfile.png"; // 기본 프로필 이미지 임포트
import filledHeart from "../../assets/filledHeart.png"; // 채워진 하트 이미지 임포트
import emptyHeart from "../../assets/emptyHeart.png"; // 빈 하트 이미지 임포트
import useBeneficiary from "../../hooks/useBeneficiary"; // 수혜자 관련 커스텀 훅 임포트

/*
Function name: BeneficiaryDetailPage
Summary: 수혜자 상세 정보를 보여주는 컴포넌트
Parameter: N/A
Return: 총 1개; 수혜자 상세 정보 컴포넌트
Caller: N/A
Date: 2024-09-22
Write by: 길정수
*/
const BeneficiaryDetailPage = () => {
  const { beneficiaryId } = useParams(); // URL에서 수혜자 ID 가져오기
  const { beneficiaryInfo, getBeneficiaryDetail, toggleInterestAboutBeneficiary, loading, error } =
    useBeneficiary(); // 수혜자 상세 정보 가져오기

  const [isInterested, setIsInterested] = useState(false); // 관심 여부 상태

  useEffect(() => {
    const initialize = async () => {
      try {
        await getBeneficiaryDetail(beneficiaryId);
        console.log("detail", beneficiaryInfo);
      } catch (err) {
        console.log("Failed to fetch Beneficiary Detail Info:", err);
      }
    };
    initialize();
  }, [isInterested]);

  // 수혜자 상세 정보가 업데이트되면 관심 여부 상태 업데이트
  useEffect(() => {
    const beneficiary = beneficiaryInfo.find(
      (b) => b.beneficiaryId === parseInt(beneficiaryId)
    );
    if (beneficiary) {
      setIsInterested(beneficiary.isInterested); // 관심 여부 상태 업데이트
    }
  }, [beneficiaryInfo, beneficiaryId, isInterested]);

  // 로딩 상태 처리
  if (loading && !beneficiaryInfo.length) {
    return <p>Loading...</p>; // 로딩 중 메시지
  }

  // 오류 상태 처리
  if (error) {
    return <p>Error: {error}</p>; // 오류 메시지
  }

  // 수혜자 상세 정보가 없는 경우 처리
 const beneficiary = beneficiaryInfo.find(
      (b) => b.beneficiaryId === parseInt(beneficiaryId)
    );
  if (!beneficiary) {
    return <p>No beneficiary data available</p>; // 수혜자 데이터 없음 메시지
  }

  // 관심사 토글 함수
  const handleToggleInterest = async () => {
    const previousState = isInterested; // 이전 상태 저장
    const updatedState = !isInterested; // 토글된 상태

    // UI 즉시 업데이트
    setIsInterested(updatedState);

    try {
      // 서버에 요청 보내기
      await toggleInterestAboutBeneficiary(beneficiaryId); // 서버 요청을 await
      console.log("상세", beneficiaryInfo);
    } catch (error) {
      console.error("Failed to toggle interest:", error);
      setIsInterested(previousState); // 오류 발생 시 상태 롤백
    }
  };

  return (
    <div className="beneficiary-detail-page">
      <img
        className="beneficiary-detail-page__background"
        src={backgroundImage} // 배경 이미지 설정
        alt="Background"
      />
      <div className="beneficiary-detail-page__profile">
        <img
          className="beneficiary-detail-page__img"
          src={defaultProfileImage} // 프로필 이미지 설정
          alt="Beneficiary"
        />
        <div className="beneficiary-detail-page__text">
          <div className="beneficiary-detail-page__text--first">
            <div className="beneficiary-detail-page__name">
              {beneficiary.beneficiaryName} {/* 수혜자 이름 표시 */}
            </div>
            <div
              className="beneficiary-detail-page__button--interest"
              onClick={handleToggleInterest} // 관심사 토글
            >
              <img
                className="beneficiary-detail-page__heart"
                src={isInterested ? filledHeart : emptyHeart} // 하트 아이콘 설정
                alt="Heart Icon"
              />
            </div>
          </div>
          <div className="beneficiary-detail-page__tags">
            {beneficiary.beneficiaryTags.map((tag) => (
              <div key={tag.id} className="tagItem">
                #{tag.name} {/* 태그의 name 속성에 접근 */}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="beneficiary-detail-page__content">
        {beneficiary.beneficiaryInfo} {/* 수혜자 정보 표시 */}
      </div>
    </div>
  );
};

export default BeneficiaryDetailPage; // BeneficiaryDetailPage 컴포넌트 내보내기
