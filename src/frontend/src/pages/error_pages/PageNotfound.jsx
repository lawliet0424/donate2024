import "./PageNotFound.css";
import warning from "../../assets/warning.png";

const PageNotFound = () => {
  return (
    <div className="PageNotFound">
      <img src={warning} className="pageNotFoundImg" alt="Page Not Found" />
      <div className="pageNotFoundContent">
        <div className="pageNotFoundTitle">Not Found</div>
        <div className="pageNotFoundText">
          요청하신 페이지가 존재하지 않습니다
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
