import "./BeneficiaryBox.css";
import React, { useState } from "react";
import TransparentButton from "../components/TransparentButton";
import defaultProfileImage from "../assets/defaultProfile.png";
import filledHeart from "../assets/filled_heart.png";
import emptyHeart from "../assets/empty_heart.png";

const BeneficiaryBox = ({ profileImage, name, tags, id }) => {
  const [isInterested, setIsInterested] = useState(false);

  const toggleInterest = () => {
    setIsInterested(!isInterested);
  };

  const onClickBeneficiaryDetailPageLink = () => {
    const newWindow = window.open(
      `/beneficiarydetailpage?beneficiaryId=${id}`,
      "_blank"
    );

    if (newWindow) {
      newWindow.onload = () => {
        newWindow.document.title = `Do-Nate/수혜자/상세페이지 ${name}`;
      };
    }
  };

  const imageSrc = profileImage ? profileImage : defaultProfileImage;

  return (
    <div className="BeneficiaryBox">
      <img className="profileImage" src={imageSrc} alt={name} />
      <div className="beneficiaryBoxText">
        <div className="beneficiaryFirstLine">
          <div className="name">{name}</div>
          <div className="interestButton" onClick={toggleInterest}>
            <img
              className="heartImg"
              src={isInterested ? filledHeart : emptyHeart}
              alt="Heart Icon"
            />
          </div>
        </div>
        <div className="tagList">
          {tags.map((tag, index) => (
            <div key={index} className="tagItem">
              #{tag}
            </div>
          ))}
        </div>
      </div>
      <TransparentButton
        text="> 상세 페이지"
        onClick={onClickBeneficiaryDetailPageLink}
      />
    </div>
  );
};

export default BeneficiaryBox;
