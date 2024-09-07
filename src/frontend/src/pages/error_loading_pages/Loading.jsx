import React from "react";
import "./Loading.css";
import spinner from "../../assets/spinner.gif";

const Loading = () => {
  return (
    <div className="loading">
      <div className="loading__text">잠시만 기다려 주세요.</div>
      <img src={spinner} alt="로딩" />
    </div>
  );
};

export default Loading;
