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
    <div className="beneficiary-box">
      <img
        className="beneficiary-box__profile"
        src={imageSrc}
        alt={selectedBeneficiary.beneficiaryName || "Beneficiary"}
      />
      <div className="beneficiary-box__details">
        <div className="beneficiary-box__header">
          <div className="beneficiary-box__name">
            {selectedBeneficiary.beneficiaryName || "No Name"}
          </div>
          <div
            className="beneficiary-box__button--interest"
            onClick={handleToggleInterest}
          >
            <img
              className="beneficiary-box__heart"
              src={isInterested ? filledHeart : emptyHeart}
              alt="Heart Icon"
            />
          </div>
        </div>
        <div className="beneficiary-box__tag__section">
          {selectedBeneficiary.beneficiaryTags &&
          selectedBeneficiary.beneficiaryTags.length > 0 ? (
            selectedBeneficiary.beneficiaryTags.map((tag) => (
              <div
                key={tag.id}
                className={`beneficiary-box__tag ${
                  selectedTags.includes(tag.id)
                    ? "beneficiary-box__tag--selected"
                    : ""
                }`}
              >
                #{tag.name}
              </div>
            ))
          ) : (
            <div className="beneficiary-box__tag">No Tags</div>
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
