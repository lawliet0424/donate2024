import React from "react";
import "./BeneficiaryBox.css";
import TransparentButton from "../components/TransparentButton";

const BeneficiaryBox = ({ profileImage, name, tags, id }) => {
  const onClickBeneficiaryDetailPageLink = (beneficiaryId, beneficiaryName) => {
    const newWindow = window.open(
      `/beneficiarydetailpage?beneficiaryId=${beneficiaryId}`,
      "_blank"
    );

    if (newWindow) {
      // Wait for the new window to load, then set the title
      newWindow.onload = () => {
        newWindow.document.title = `Do-Nate/수혜자/상세페이지${beneficiaryName}`;
      };
    }
  };

  return (
    <div className="BeneficiaryBox">
      <img className="profileImage" src={profileImage} alt={name} />
      <div className="beneficiaryBoxText">
        <div className="name">{name}</div>
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
        onClick={() => onClickBeneficiaryDetailPageLink(id, name)}
      />
    </div>
  );
};

export default BeneficiaryBox;