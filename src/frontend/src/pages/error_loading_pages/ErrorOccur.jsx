import "./ErrorOccur.css"; // CSS 파일 임포트
import { useNavigate } from "react-router-dom"; // React Router의 navigate 훅 임포트
import ColoredButton from "../../components/ColoredButton"; // 색상 버튼 컴포넌트 임포트

/*
Function name: ErrorOccur
Summary: 오류 발생 시 보여주는 페이지 컴포넌트
Parameter: N/A
Return: 총 1개; 오류 발생 페이지 컴포넌트
Caller: N/A
Date: 2024-09-22
Write by: 길정수
*/
const ErrorOccur = () => {
  const navigate = useNavigate(); // navigate 훅 사용

  // 메인으로 이동하는 핸들러
  const onHomeButtonClicked = () => {
    navigate("/"); // 홈으로 이동
  };

  return (
    <div className="error-occur">
      <div className="error-occur__title">ERROR</div> {/* 오류 제목 */}
      <div className="error-occur__text--first">
        <div>죄송합니다. 알 수 없는 오류가 발생했습니다.</div> {/* 오류 메시지 1 */}
      </div>
      <div className="error-occur__text--second">
        <div>요청을 처리하는 과정에서 알 수 없는 에러가 발생했습니다.</div> {/* 오류 메시지 2 */}
        <div>새로고침하여 다시 한 번 요청을 보내주세요.</div> {/* 오류 처리 안내 메시지 */}
      </div>
      <ColoredButton
        text={"메인으로 이동"} // 버튼 텍스트
        colorScheme={"white"} // 버튼 색상
        onClick={onHomeButtonClicked} // 버튼 클릭 시 메인으로 이동 핸들러
        className="error-occur__button" // 버튼 클래스
      />
    </div>
  );
};

export default ErrorOccur; // ErrorOccur 컴포넌트 내보내기
