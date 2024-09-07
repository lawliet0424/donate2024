import "./ErrorOccur.css";
import { useNavigate } from "react-router-dom";
import ColoredButton from "../../components/ColoredButton";

const ErrorOccur = () => {
  const navigate = useNavigate();

  const onHomeButtonClicked = () => {
    navigate("/");
  };

  return (
    <div className="error-occur">
      <div className="error-occur__title">ERROR</div>
      <div className="error-occur__text--first">
        <div>죄송합니다. 알 수 없는 오류가 발생했습니다.</div>
      </div>
      <div className="error-occur__text--second">
        <div>요청을 처리하는 과정에서 알 수 없는 에러가 발생했습니다.</div>
        <div>새로고침하여 다시 한 번 요청을 보내주세요.</div>
      </div>
      <ColoredButton
        text={"메인으로 이동"}
        colorScheme={"white"}
        onClick={onHomeButtonClicked}
        className="error-occur__button"
      />
    </div>
  );
};

export default ErrorOccur;
