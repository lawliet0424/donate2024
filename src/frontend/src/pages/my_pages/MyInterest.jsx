import "./MyInterest.css";
import React, { useEffect } from "react";
import BeneficiaryBox from "../../components/BeneficiaryBox";
import useInterest from "../../hooks/useInterest";

const MyInterest = () => {
  const { userInterests, getUserInterests } = useInterest();

  useEffect(() => {
    getUserInterests();
  }, [getUserInterests]);

  return (
    <div className="MyInterest">
      <div className="title">나의 관심 수혜자</div>
      <div className="beneficiaryLists">
        {userInterests.map((beneficiaryId) => (
          <BeneficiaryBox key={beneficiaryId} beneficiaryId={beneficiaryId} />
        ))}
      </div>
    </div>
  );
};

export default MyInterest;
