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
  const { beneficiaries, getBeneficiaryById, loading, error } =
    useBeneficiary();
  const { userInterests, toggleInterest, getUserInterests } = useInterest();

  const isInterested = userInterests.includes(beneficiaryId.toString());

  useEffect(() => {
    getUserInterests();
  }, [getUserInterests]);

  useEffect(() => {
    if (!beneficiaries[beneficiaryId]) {
      getBeneficiaryById(beneficiaryId);
    }
  }, [beneficiaryId, beneficiaries, getBeneficiaryById]);

  // 로딩 상태 처리
  if (loading && !beneficiaries[beneficiaryId]) {
    return <p>Loading...</p>;
  }

  // 오류 상태 처리
  if (error) {
    return <p>Error: {error}</p>;
  }

  // `selectedBeneficiary`가 null인 경우
  const selectedBeneficiary = beneficiaries[beneficiaryId];
  if (!selectedBeneficiary) {
    return <p>No beneficiary data available</p>;
  }

  return (
    <div className="BeneficiaryDetailPage">
      <img
        className="backgroungImage"
        src={selectedBeneficiary.beneficiaryBackgroundImg}
        alt="Background"
      />
      <div className="beneficiaryProfile">
        <img
          className="beneficiaryImage"
          src={selectedBeneficiary.beneficiaryProfileImg}
          alt="Beneficiary"
        />
        <div className="beneficiaryProfileText">
          <div className="beneficiaryFirstLine">
            <div className="beneficiaryName">
              {selectedBeneficiary.beneficiaryName}
            </div>
            <div
              className="interestButton"
              onClick={() => toggleInterest(beneficiaryId)}
            >
              <img
                className="heartImg"
                src={isInterested ? filledHeart : emptyHeart}
                alt="Heart Icon"
              />
            </div>
          </div>
          <div className="beneficiaryTags">
            {selectedBeneficiary.beneficiaryTags.map((tag, index) => (
              <div key={index} className="tagItem">
                #{tag.name} {/* 태그의 name 속성에 접근 */}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="beneficiaryInfo">
        {selectedBeneficiary.beneficiaryInfo}
      </div>
    </div>
  );
};

export default BeneficiaryDetailPage;
