import "./DonationDone.css";
import { useNavigate, useLocation } from "react-router-dom";
import DoNateLogo from "../../assets/DoNateIcon.png";
import ColoredButton from "../../components/ColoredButton";

const DonationDone = () => {
  const nav = useNavigate();
  const location = useLocation();

  const { personnel, amount, perPerson } = location.state || {};

  const onStatusButtonClicked = () => {
    nav("/mystatus");
  };

  const onHomeButtonClicked = () => {
    nav("/");
  };

  return (
    <div className="DonationDone">
      <div className="title">기부 완료</div>
      <img className="DoNateLogoImg" src={DoNateLogo} alt="DoNateLogo" />
      <div className="resultContent">
        <div className="resultLineOne">
          {`${personnel.toLocaleString()}명에게 ${amount.toLocaleString()}원을 나눠 기부하였습니다.`}
        </div>
        <div className="resultLineTwo">
          {`수혜자 한 명당 ${perPerson.toLocaleString()}원 기부되었습니다.`}
        </div>
      </div>
      <div className="pageNavigationButtons">
        <ColoredButton text={"메인으로"} onClick={onHomeButtonClicked} />
        <ColoredButton
          text={"내역 조회"}
          colorScheme={"orange"}
          onClick={onStatusButtonClicked}
        />
      </div>
    </div>
  );
};

export default DonationDone;
