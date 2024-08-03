import "./BeneficiaryDetailPage.css";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import backgroungImage from "../../assets/exampleImg.png";
import filledHeart from "../../assets/filled_heart.png";
import emptyHeart from "../../assets/empty_heart.png";

const dummyBeneficiaryData = [
  {
    beneficiaryId: 1,
    beneficiaryName: "수혜자1",
    beneficiaryInfo: "수혜자 상세 정보1",
    beneficiaryTags: ["태그", "태그", "태그"],
  },
  {
    beneficiaryId: 2,
    beneficiaryName: "수혜자2",
    beneficiaryInfo: "수혜자 상세 정보2",
    beneficiaryTags: ["태그", "태그", "태그"],
  },
  {
    beneficiaryId: 3,
    beneficiaryName: "수혜자3",
    beneficiaryInfo: "수혜자 상세 정보3",
    beneficiaryTags: ["태그", "태그", "태그", "xorm", "태그", "xorm"],
  },
];

const findMatchingData = (urlBeneficiaryId) => {
  return dummyBeneficiaryData.find(
    (data) => String(data.beneficiaryId) === String(urlBeneficiaryId)
  );
};

const BeneficiaryDetailPage = () => {
  const [searchParams] = useSearchParams();
  const urlBeneficiaryId = searchParams.get("beneficiaryId");
  const beneficiaryData = findMatchingData(urlBeneficiaryId);
  const [isInterested, setIsInterested] = useState(false);

  const toggleInterest = () => {
    setIsInterested(!isInterested);
  };

  if (!beneficiaryData) {
    return <div className="BeneficiaryDetailPage">Beneficiary not found</div>;
  }

  return (
    <div className="BeneficiaryDetailPage">
      <img className="backgroungImage" src={backgroungImage} alt="Background" />
      <div className="beneficiaryProfile">
        <img className="beneficiaryImage" alt="Beneficiary" />
        <div className="beneficiaryProfileText">
          <div className="beneficiaryFirstLine">
            <div className="beneficiaryName">
              {beneficiaryData.beneficiaryName}
            </div>
            <div className="interestButton" onClick={toggleInterest}>
              <img
                className="heartImg"
                src={isInterested ? filledHeart : emptyHeart}
                alt="Heart Icon"
              />
            </div>
          </div>
          <div className="beneficiaryTags">
            {beneficiaryData.beneficiaryTags.map((tag, index) => (
              <div key={index} className="tagItem">
                #{tag}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="beneficiaryInfo">{beneficiaryData.beneficiaryInfo}</div>
    </div>
  );
};

export default BeneficiaryDetailPage;
