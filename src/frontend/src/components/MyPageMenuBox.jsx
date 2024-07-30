import "./MyPageMenuBox.css";
import React from "react";
import TransparentButton from "../components/TransparentButton";
import { useNavigate } from "react-router-dom";

const MyPageMenuBox = ({ menuName, myPageType }) => {
  const nav = useNavigate();

  const onClickShowDetailMy = (myPageType) => {
    nav(`${myPageType}`);
  };

  return (
    <div className="MyPageMenuBox">
      <div className="menuName">{menuName}</div>
      <TransparentButton
        text={`> 상세 페이지`}
        onClick={() => onClickShowDetailMy(myPageType)}
      />
    </div>
  );
};

export default MyPageMenuBox;
