import React from "react";
import "./BeneficiaryBox.css";
import TransparentButton from "../components/TransparentButton";

const BeneficiaryBox = ({ profileImage, name, tags, id }) => {
  const onClickBeneficiaryDetailPageLink = (beneficiaryId) => {
    window.open(
      `/beneficiarydetailpage?beneficiaryId=${beneficiaryId}`,
      "_blank"
    );
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
        onClick={() => onClickBeneficiaryDetailPageLink(id)}
      />
    </div>
  );
};

export default BeneficiaryBox;
