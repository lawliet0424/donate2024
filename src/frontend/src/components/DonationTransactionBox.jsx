import React from "react";
import TransactionStatusBox from "../components/TransactionStatusBox";
import TransparentButton from "../components/TransparentButton";
import BubbleTooltip from "../components/BubbleTooltip"; // 툴팁 컴포넌트 임포트
import "./DonationTransactionBox.css";

const DonationTransactionBox = ({ beneficiaryName, amountPerPerson, status, walletFrom, walletTo, date, txLink }) => {

  const shortenWallet = (wallet) => {
    return `${wallet.substring(0, 10)}...${wallet.substring(wallet.length - 10)}`;
  };

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
                {"From"}
                <BubbleTooltip content={walletFrom}>
                  <span className="DonationTransactionBox__wallet">{shortenWallet(walletFrom)}</span>
                </BubbleTooltip>
                {"To"}
                <BubbleTooltip content={walletTo}>
                  <span className="DonationTransactionBox__wallet">{shortenWallet(walletTo)}</span>
                </BubbleTooltip>
                {": For "}{amountPerPerson.toLocaleString()}
           </div>
           <div className="DonationTransactionBox__date">
               {`${date}`}
           </div>
           <TransparentButton
             text="블록체인에서 기부 내역 확인하기 >"
             onClick={() => window.open(`${txLink}`, "_blank")}
           />
        </div>
    </div>
  );
};

export default DonationTransactionBox;
