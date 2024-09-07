import "./DonationDone.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react"; // useEffect 추가
import DoNateLogo from "../../assets/DoNateIcon.png";
import ColoredButton from "../../components/ColoredButton";

const DonationDone = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { numberOfPeople, amount, amountPerPerson } = location.state || {};

  const onStatusButtonClicked = () => {
    navigate("/mystatus");
  };

  const onHomeButtonClicked = () => {
    navigate("/");
  };

  // 뒤로 가기 방지 로직 추가
  useEffect(() => {
    // 현재 페이지 상태 추가
    window.history.pushState(null, null, window.location.href);

    const handlePopState = (event) => {
      window.alert("결제가 완료된 페이지에서는 뒤로 갈 수 없습니다.");
      navigate("/donaton/done");
      window.history.pushState(null, null, window.location.href); // 다시 현재 페이지 상태로 유지
    };

    // popstate 이벤트 리스너 추가
    window.addEventListener("popstate", handlePopState);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 해제
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  return (
    <div className="donation-done">
      <div className="donation-done__title">기부 완료</div>
      <img className="donation-done__logo" src={DoNateLogo} alt="DoNateLogo" />
      <div className="donation-done__result">
        <div className="donation-done__text--first">
          {`${numberOfPeople.toLocaleString()}명에게 ${amount.toLocaleString()}원을 나눠 기부하였습니다.`}
        </div>
        <div className="donation-done__text--second">
          {`수혜자 한 명당 ${amountPerPerson.toLocaleString()}원 기부되었습니다.`}
        </div>
      </div>
      <div className="donation-done__navigation">
        <ColoredButton
          text={"메인으로"}
          onClick={onHomeButtonClicked}
          className={"donation-done__button"}
        />
        <ColoredButton
          text={"내역 조회"}
          colorScheme={"orange"}
          onClick={onStatusButtonClicked}
          className={"donation-done__button"}
        />
      </div>
    </div>
  );
};

export default DonationDone;
