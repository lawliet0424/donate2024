import "./BeneficiaryBox.css";
import React, { useEffect, useCallback } from "react";
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
  }, [beneficiaryId, beneficiaries, getBeneficiaryById]);

  const handleToggleInterest = useCallback(() => {
    toggleInterest(beneficiaryId);
  }, [beneficiaryId, toggleInterest]);

  if (loading && !beneficiaries[beneficiaryId]) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
      <div className="beneficiaryDetails">
        <div className="beneficiaryHeader">
          <div className="beneficiaryName">
            {selectedBeneficiary.beneficiaryName || "No Name"}
          </div>
          <div className="likeButton" onClick={handleToggleInterest}>
            <img
              className="heartImg"
              src={isInterested ? filledHeart : emptyHeart}
              alt="Heart Icon"
            />
          </div>
        </div>
        <div className="beneficiaryTagsContainer">
          {selectedBeneficiary.beneficiaryTags &&
          selectedBeneficiary.beneficiaryTags.length > 0 ? (
            selectedBeneficiary.beneficiaryTags.map((tag) => (
              <div
                key={tag.id}
                className={`tagItem ${
                  selectedTags.includes(tag.id) ? "tagItem--selected" : ""
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
