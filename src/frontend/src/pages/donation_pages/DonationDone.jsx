import "./DonationDone.css"; // CSS 파일 임포트
import { useNavigate, useLocation } from "react-router-dom"; // React Router의 navigate 및 location 훅 임포트
import { useEffect } from "react"; // useEffect 추가
import DoNateLogo from "../../assets/DoNateIcon.png"; // DoNate 로고 이미지 임포트
import ColoredButton from "../../components/ColoredButton"; // 컬러 버튼 컴포넌트 임포트

/*
Function name: DonationDone
Summary: 기부 완료 페이지 컴포넌트
Parameter: N/A
Return: 총 1개; 기부 완료 페이지 컴포넌트
Caller: N/A
Date: 2024-09-22
Write by: 길정수
*/
const DonationDone = () => {
  const navigate = useNavigate(); // navigate 훅 사용
  const location = useLocation(); // 현재 위치 가져오기

  const { numberOfPeople, amount, amountPerPerson } = location.state || {}; // 기부 정보 가져오기

  const onStatusButtonClicked = () => {
    navigate("/mystatus"); // 내역 조회 버튼 클릭 시 이동
  };

  const onHomeButtonClicked = () => {
    navigate("/"); // 메인으로 버튼 클릭 시 이동
  };

  // 뒤로 가기 방지 로직 추가
  useEffect(() => {
    // 현재 페이지 상태 추가
    window.history.pushState(null, null, window.location.href);

    const handlePopState = (event) => {
      // 뒤로가기 시 경고 메시지 표시
      window.alert("결제가 완료된 페이지에서는 뒤로 갈 수 없습니다.");
      navigate("/donation/done"); // 다시 현재 페이지로 이동
      window.history.pushState(null, null, window.location.href); // 다시 현재 페이지 상태로 유지
    };

    // popstate 이벤트 리스너 추가
    window.addEventListener("popstate", handlePopState);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 해제
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]); // navigate 의존성 추가

  return (
    <div className="donation-done">
      <div className="donation-done__title">기부 완료</div>{" "}
      {/* 기부 완료 제목 */}
      <img
        className="donation-done__logo"
        src={DoNateLogo}
        alt="DoNateLogo"
      />{" "}
      {/* 로고 이미지 */}
      <div className="donation-done__result">
        <div className="donation-done__text--first">
          {`${numberOfPeople.toLocaleString()}명에게 ${amount.toLocaleString()}원을 나눠 기부하였습니다.`}{" "}
          {/* 기부 결과 메시지 */}
        </div>
        <div className="donation-done__text--second">
          {`수혜자 한 명당 ${amountPerPerson.toLocaleString()}원 기부되었습니다.`}{" "}
          {/* 수혜자당 기부 금액 메시지 */}
        </div>
      </div>
      <div className="donation-done__navigation">
        <ColoredButton
          text={"메인으로"}
          onClick={onHomeButtonClicked} // 메인으로 버튼 클릭 시 호출
          className={"donation-done__button"}
        />
        <ColoredButton
          text={"내역 조회"}
          colorScheme={"orange"}
          onClick={onStatusButtonClicked} // 내역 조회 버튼 클릭 시 호출
          className={"donation-done__button"}
        />
      </div>
    </div>
  );
};

export default DonationDone; // DonationDone 컴포넌트 내보내기
