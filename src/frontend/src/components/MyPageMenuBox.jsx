import "./MyPageMenuBox.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import TransparentButton from "../components/TransparentButton";

/*
  Function name: MyPageMenuBox
  Summary: 마이페이지 메뉴 박스 컴포넌트
  Parameter: 총 2개
             string menuName; 메뉴 이름
             string myPageLink; 클릭 시 이동할 마이페이지 링크
  Return: 총 1개; 메뉴 박스를 포함한 JSX 컴포넌트
  Caller: 마이페이지 관련 컴포넌트에서 호출 가능
  Date: 2024.09.21
  Write by: 길정수
*/
const MyPageMenuBox = ({ menuName, myPageLink }) => {
  const navigate = useNavigate();

  /*
    Function name: handleClick
    Summary: 클릭 시 myPageLink로 이동하는 함수
    Parameter: 없음
    Return: 없음
    Date: 2024.09.21
    Write by: 길정수
  */
  const handleClick = () => {
    navigate(`${myPageLink}`);
  };

  /*
    JSX: 메뉴 이름과 버튼을 포함한 컴포넌트 구조
  */
  return (
    <div className="MyPageMenuBox">
      <div className="MyPageMenuBox__title">{menuName}</div>
      <TransparentButton text="> 상세 페이지" onClick={handleClick} />
    </div>
  );
};

export default MyPageMenuBox;
