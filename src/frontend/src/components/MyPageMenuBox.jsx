import "./MyPageMenuBox.css";
import React from "react";
import TransparentButton from "../components/TransparentButton";
import { useNavigate } from "react-router-dom";

const MyPageMenuBox = ({ menuName, myPageType }) => {
  const navigate = useNavigate();

  const onClickMenuBox = () => {
    navigate(`${myPageType}`);
  };

  return (
    <div className="MyPageMenuBox">
      <div className="menuName">{menuName}</div>
      <TransparentButton text="> 상세 페이지" onClick={onClickMenuBox} />
    </div>
  );
};

export default MyPageMenuBox;
