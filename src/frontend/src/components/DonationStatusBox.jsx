import "./DonationStatusBox.css";
import React, { useEffect, useCallback, useState } from "react";
import TransparentButton from "../components/TransparentButton";
import defaultProfileImage from "../assets/defaultProfile.png";
import filledHeart from "../assets/filledHeart.png";
import emptyHeart from "../assets/emptyHeart.png";
import useBeneficiary from "../hooks/useBeneficiary";
import Loading from "../pages/error_loading_pages/Loading.jsx";

/*
  Function name: DonationStatusBox
  Summary:
  Parameter:
  Return:
*/
const DonationStatusBox = ({ numberOfPeople, totalAmount, statusId, date, beneficiaryList }) => {

  // 수혜자 이미지가 없을 경우 기본 프로필 이미지 사용
  const imageSrc = defaultProfileImage;

  return (
    <div className="DonationStatusBox">
        <div className="DonationStatusBox__date">
           {`${date}`}
        </div>
    <div className="DonationStatusBox__content">
      <img
        className="DonationStatusBox__img"
        src={imageSrc}
      />
      <div className="DonationStatusBox__details">
          {/* 수혜자 이름 표시 */}
            <div className="DonationStatusBox__beneficiary">
              {beneficiaryList && beneficiaryList.length > 0
                ? beneficiaryList.map((beneficiary, index) => (
                    <span key={index}>{beneficiary}{index < beneficiaryList.length - 1 && ', '}</span>
                  ))
                : "수혜자 정보가 없습니다."}
            </div>
           <div className="DonationStatusBox__message">
               {`${numberOfPeople} 명의 수혜자에게 ${totalAmount.toLocaleString()}원을 기부했습니다.`}
           </div>
              {/* 상세 페이지로 이동하는 버튼 */}
              <TransparentButton
                text="기부 상세 >"
                onClick={() => window.open(`/beneficiary/${statusId}`, "_blank")}
              />
            </div>
         </div>
      </div>

  );
};

export default DonationStatusBox;
