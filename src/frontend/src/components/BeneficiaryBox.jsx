import "./BeneficiaryBox.css";
import React, { useEffect } from "react";
import TransparentButton from "../components/TransparentButton";
import defaultProfileImage from "../assets/defaultProfile.png";
import filledHeart from "../assets/filledHeart.png";
import emptyHeart from "../assets/emptyHeart.png";
import useBeneficiary from "../hooks/useBeneficiary";
import useInterest from "../hooks/useInterest";

const BeneficiaryBox = ({ beneficiaryId, selectedTags = [] }) => {
  const { beneficiaries, getBeneficiaryById, loading, error } =
    useBeneficiary();
  const { userInterests, toggleInterest } = useInterest();
  const isInterested = userInterests.includes(beneficiaryId.toString());

  useEffect(() => {
    if (!beneficiaries[beneficiaryId]) {
      getBeneficiaryById(beneficiaryId);
    }
  }, [beneficiaryId, getBeneficiaryById, beneficiaries]);

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

  const imageSrc =
    selectedBeneficiary.beneficiaryProfileImg || defaultProfileImage;

  return (
    <div className="BeneficiaryBox">
      <img
        className="profileImage"
        src={imageSrc}
        alt={selectedBeneficiary.beneficiaryName || "Beneficiary"}
      />
      <div className="beneficiaryBoxText">
        <div className="beneficiaryFirstLine">
          <div className="beneficiaryName">
            {selectedBeneficiary.beneficiaryName || "No Name"}
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
          {selectedBeneficiary.beneficiaryTags &&
          selectedBeneficiary.beneficiaryTags.length > 0 ? (
            selectedBeneficiary.beneficiaryTags.map((tag, index) => (
              <div
                key={index}
                className={`tagItem ${
                  selectedTags.includes(tag.id) ? "tagItem_isSelected" : ""
                }`}
              >
                #{tag.name}
              </div>
            ))
          ) : (
            <div className="tagItem">No Tags</div>
          )}
        </div>
      </div>
      <TransparentButton
        text="> 상세 페이지"
        onClick={() => window.open(`/beneficiary/${beneficiaryId}`, "_blank")}
      />
    </div>
  );
};

export default BeneficiaryBox;
