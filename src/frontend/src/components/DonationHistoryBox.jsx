import "./DonationHistoryBox.css";
import React, { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import TransparentButton from "../components/TransparentButton";
import defaultProfileImage from "../assets/defaultProfile.png";
import filledHeart from "../assets/filledHeart.png";
import emptyHeart from "../assets/emptyHeart.png";
import useBeneficiary from "../hooks/useBeneficiary";
import Loading from "../pages/error_loading_pages/Loading.jsx";

/*
  Function name: DonationHistoryBox
  Summary:
  Parameter:
  Return:
*/
const DonationHistoryBox = ({ numberOfPeople, totalAmount, historyId, date, beneficiaryList }) => {
      const navigate = useNavigate();

      const handleHistoryDetailButtonClick = () => {
        navigate(`/myhistory/${historyId}`);
      };

  // 수혜자 이미지가 없을 경우 기본 프로필 이미지 사용
  const imageSrc = defaultProfileImage;

  return (
    <div className="DonationHistoryBox">
        <div className="DonationHistoryBox__date">
           {`${date}`}
        </div>
    <div className="DonationHistoryBox__content">
      <img
        className="DonationHistoryBox__img"
        src={imageSrc}
      />
      <div className="DonationHistoryBox__details">
          {/* 수혜자 이름 표시 */}
            <div className="DonationHistoryBox__beneficiary">
              {beneficiaryList && beneficiaryList.length > 0
                ? beneficiaryList.map((beneficiary, index) => (
                    <span key={index}>{beneficiary}{index < beneficiaryList.length - 1 && ', '}</span>
                  ))
                : "수혜자 정보가 없습니다."}
            </div>
           <div className="DonationHistoryBox__message">
               {`${numberOfPeople}명의 수혜자에게 ${totalAmount.toLocaleString()}원을 기부하였습니다`}
           </div>
              {/* 상세 페이지로 이동하는 버튼 */}
              <TransparentButton
                text="기부 상세 >"
                onClick={handleHistoryDetailButtonClick}
              />
            </div>
         </div>
      </div>

  );
};

export default DonationHistoryBox;
