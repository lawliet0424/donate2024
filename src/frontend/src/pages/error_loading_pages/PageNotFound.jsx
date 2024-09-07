import "./PageNotFound.css";
import { useNavigate } from "react-router-dom";
import ColoredButton from "../../components/ColoredButton";

const PageNotFound = () => {
  const navigate = useNavigate();

  const onHomeButtonClicked = () => {
    navigate("/");
  };

  return (
    <div className="page-not-found">
      <div className="page-not-found__title">404 ERROR</div>
      <div className="page-not-found__text--first">
        <div>죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</div>
      </div>
      <div className="page-not-found__text--second">
        <div>존재하지 않는 주소를 입력하였거나,</div>
        <div>주소가 변경 또는 삭제되어 찾을 수 없습니다.</div>
      </div>
      <ColoredButton
        text={"메인으로 이동"}
        colorScheme={"white"}
        onClick={onHomeButtonClicked}
        className="page-not-found__button"
      />
    </div>
  );
};

export default PageNotFound;
