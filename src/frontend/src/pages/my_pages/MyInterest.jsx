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
    <div className="my-interest">
      <div className="my-interest__title">나의 관심 수혜자</div>
      <div className="my-interest__beneficiaryLists">
        {userInterests.map((beneficiaryId) => (
          <BeneficiaryBox key={beneficiaryId} beneficiaryId={beneficiaryId} />
        ))}
      </div>
    </div>
  );
};

export default MyInterest;
