import "./BeneficiaryDetailPage.css";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import backgroungImage from "../../assets/exampleImg.png";
import defaultProfileImage from "../../assets/defaultProfile.png";
import filledHeart from "../../assets/filledHeart.png";
import emptyHeart from "../../assets/emptyHeart.png";
import useBeneficiary from "../../hooks/useBeneficiary";
import useInterest from "../../hooks/useInterest";

const BeneficiaryDetailPage = () => {
  const { beneficiaryId } = useParams();
  const { beneficiaryDetailInfo, getBeneficiaryDetail, loading, error } =
    useBeneficiary();
  const { userInterests, toggleInterest } = useInterest();

  const isInterested = userInterests.includes(beneficiaryId);

  useEffect(() => {
    if (!beneficiaryDetailInfo[beneficiaryId]) {
      getBeneficiaryDetail(beneficiaryId); // 수혜자 상세 정보를 가져옵니다.
    }
  }, [beneficiaryId, beneficiaryDetailInfo, getBeneficiaryDetail]);

  // 로딩 상태 처리
  if (loading && !beneficiaryDetailInfo[beneficiaryId]) {
    return <p>Loading...</p>;
  }

  // 오류 상태 처리
  if (error) {
    return <p>Error: {error}</p>;
  }

  // 수혜자 상세 정보가 없는 경우 처리
  const selectedBeneficiary = beneficiaryDetailInfo[beneficiaryId];
  if (!selectedBeneficiary) {
    return <p>No beneficiary data available</p>;
  }

  return (
    <div className="beneficiary-detail-page">
      <img
        className="beneficiary-detail-page__background"
        src={selectedBeneficiary.beneficiaryBackgroundImg || backgroungImage}
        alt="Background"
      />
      <div className="beneficiary-detail-page__profile">
        <img
          className="beneficiary-detail-page__img"
          src={selectedBeneficiary.beneficiaryProfileImg || defaultProfileImage}
          alt="Beneficiary"
        />
        <div className="beneficiary-detail-page__text">
          <div className="beneficiary-detail-page__text--first">
            <div className="beneficiary-detail-page__name">
              {selectedBeneficiary.beneficiaryName}
            </div>
            <div
              className="beneficiary-detail-page__button--interest"
              onClick={() => toggleInterest(beneficiaryId)}
            >
              <img
                className="beneficiary-detail-page__heart"
                src={isInterested ? filledHeart : emptyHeart}
                alt="Heart Icon"
              />
            </div>
          </div>
          <div className="beneficiary-detail-page__tags">
            {selectedBeneficiary.beneficiaryTags.map((tag, index) => (
              <div key={index} className="tagItem">
                #{tag.name} {/* 태그의 name 속성에 접근 */}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="beneficiary-detail-page__content">
        {selectedBeneficiary.beneficiaryInfo}
      </div>
    </div>
  );
};

export default BeneficiaryDetailPage;
