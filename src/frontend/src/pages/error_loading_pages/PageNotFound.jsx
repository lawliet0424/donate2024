import "./PageNotFound.css"; // CSS 파일 임포트
import { useNavigate } from "react-router-dom"; // useNavigate 훅 임포트
import ColoredButton from "../../components/ColoredButton"; // ColoredButton 컴포넌트 임포트

/*
Function name: PageNotFound
Summary: 요청한 페이지를 찾을 수 없을 때 표시되는 컴포넌트
Parameter: N/A
Return: 총 1개; 페이지가 존재하지 않음을 알리는 컴포넌트
Caller: N/A
Date: 2024-09-22
Write by: 길정수
*/
const PageNotFound = () => {
  const navigate = useNavigate(); // navigate 함수 초기화

  // 메인 페이지로 이동하는 함수
  const onHomeButtonClicked = () => {
    navigate("/"); // 홈으로 이동
  };

  return (
    <div className="page-not-found">
      <div className="page-not-found__title">404 ERROR</div> {/* 에러 제목 */}
      <div className="page-not-found__text--first">
        <div>죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</div>{" "}
        {/* 첫 번째 안내 메시지 */}
      </div>
      <div className="page-not-found__text--second">
        <div>존재하지 않는 주소를 입력하였거나,</div>{" "}
        {/* 두 번째 안내 메시지 */}
        <div>주소가 변경 또는 삭제되어 찾을 수 없습니다.</div>
      </div>
      <ColoredButton
        text={"메인으로 이동"}
        colorScheme={"white"}
        onClick={onHomeButtonClicked} // 버튼 클릭 시 홈으로 이동
        className="page-not-found__button"
      />
    </div>
  );
};

export default PageNotFound; // PageNotFound 컴포넌트 내보내기
