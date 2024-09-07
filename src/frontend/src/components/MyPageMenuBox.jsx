import "./MyPageMenuBox.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import TransparentButton from "../components/TransparentButton";

const MyPageMenuBox = ({ menuName, myPageLink }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${myPageLink}`);
  };

  return (
    <div className="MyPageMenuBox">
      <div className="MyPageMenuBox__title">{menuName}</div>
      <TransparentButton text="> 상세 페이지" onClick={handleClick} />
    </div>
  );
};

export default MyPageMenuBox;
