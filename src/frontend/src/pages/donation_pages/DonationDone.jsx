import "./DonationDone.css";
import DoNateLogo from "../../assets/DoNateIcon.png";
import ColoredButton from "../../components/ColoredButton";
import { useNavigate } from "react-router-dom";

const DonationDone = () => {
  const nav = useNavigate();

  const onStatusButtonClicked = () => {
    nav("/mystatus", { state: { fromThirdStep: true } });
  };

  const onHomeButtonClicked = () => {
    nav("/", { state: { fromThirdStep: true } });
  };

  return (
    <div className="DonationDone">
      <div className="title">기부 완료</div>
      <img className="DoNateLogoImg" src={DoNateLogo} alt="DoNateLogo" />
      <div className="resultContent">
        <div className="resultLineOne">
          {"___명에게 __________원을 나눠 기부하였습니다."}
        </div>
        <div className="resultLineTwo">
          {"한 명당 _______원 기부되었습니다."}
        </div>
      </div>
      <div className="pageNavigationButtons">
        <ColoredButton text={"메인으로"} onClick={onHomeButtonClicked} />
        <ColoredButton
          text={"내역 조회"}
          type={"Orange"}
          onClick={onStatusButtonClicked}
        />
      </div>
    </div>
  );
};

export default DonationDone;
