import "./DonationTransactionBox.css";
import React, { useEffect, useCallback, useState } from "react";
import TransactionStatusBox from "../components/TransactionStatusBox";
import TransparentButton from "../components/TransparentButton";
import defaultProfileImage from "../assets/defaultProfile.png";
import filledHeart from "../assets/filledHeart.png";
import emptyHeart from "../assets/emptyHeart.png";
import useBeneficiary from "../hooks/useBeneficiary";
import Loading from "../pages/error_loading_pages/Loading.jsx";

/*
  Function name: DonationTransactionBox
  Summary:
  Parameter:
  Return:
*/
const DonationTransactionBox = ({ beneficiaryName, amountPerPerson, status, walletFrom, walletTo, date }) => {



  return (
    <div className="DonationTransactionBox">
        <div className="DonationTransactionBox__firstLine">
        <div className="DonationTransactionBox__message">
            {`${beneficiaryName}님에게 ${amountPerPerson.toLocaleString()}원을 기부하였습니다`}
        </div>
            <TransactionStatusBox status={status}/>
        </div>
        <div className="DonationTransactionBox__secondLine">
           <div className="DonationTransactionBox__transaction">
                From <span className="DonationTransactionBox__wallet">{walletFrom}</span> To <span className="DonationTransactionBox__wallet">{walletTo}</span> : For {amountPerPerson.toLocaleString()}
           </div>
           <div className="DonationTransactionBox__date">
               {`${date}`}
           </div>
                       <TransparentButton
                           text="블록체인에서 기부 내역 확인하기 >"
                           onClick={() => {}}
                         />
        </div>
{/*             <TransparentButton */}
{/*                 text="블록체인에서 기부 내역 확인하기 >" */}
{/*                 onClick={() => {}} */}
{/*               /> */}
    </div>
  );
};

export default DonationTransactionBox;
