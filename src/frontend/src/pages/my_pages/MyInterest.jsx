import "./MyInterest.css";
import React from "react";
import BeneficiaryBox from "../../components/BeneficiaryBox";
import useBeneficiary from "../../hooks/useBeneficiary";

const MyInterest = () => {
  const { interestBeneficiaries } = useBeneficiary();

  return (
    <div className="my-interest">
      <div className="my-interest__title">나의 관심 수혜자</div>
      <div className="my-interest__beneficiaryLists">
        {interestBeneficiaries.map((beneficiary) => (
          <BeneficiaryBox
            key={beneficiary.beneficiaryId}
            beneficiaryId={beneficiary.beneficiaryId}
          />
        ))}
      </div>
    </div>
  );
};

export default MyInterest;
