import "./MyInterest.css";
import BeneficiaryBox from "../../components/BeneficiaryBox";
import profileImage from "../../assets/basicProfile.png";

const MyInterest = () => {
  return (
    <div className="MyInterest">
      <div className="title">나의 관심 수혜자</div>
      <div className="beneficiaryLists">
        <BeneficiaryBox
          profileImage={profileImage}
          name={"이름"}
          tags={["태그1", "태그2"]}
          id={3}
        />
        <BeneficiaryBox
          profileImage={profileImage}
          name={"이름"}
          tags={["태그1", "태그2"]}
          id={3}
        />
        <BeneficiaryBox
          profileImage={profileImage}
          name={"이름"}
          tags={["태그1", "태그2"]}
          id={3}
        />
        <BeneficiaryBox
          profileImage={profileImage}
          name={"이름"}
          tags={["태그1", "태그2"]}
          id={3}
        />
      </div>
    </div>
  );
};

export default MyInterest;
