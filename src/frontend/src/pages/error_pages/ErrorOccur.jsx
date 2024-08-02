import "./ErrorOccur.css";
import warning from "../../assets/warning.png";

const ErrorOccur = () => {
  return (
    <div className="ErrorOccur">
      <img src={warning} className="ErrorOccurImg" alt="Error Occur" />
      <div className="errorOccurContent">
        <div className="errorOccurTitle">Error</div>
        <div className="errorOccurText">에러가 발생하였습니다.</div>
      </div>
    </div>
  );
};

export default ErrorOccur;
