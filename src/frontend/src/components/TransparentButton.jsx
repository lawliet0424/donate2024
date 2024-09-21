import "./TransparentButton.css";
import React from "react";

/*
  Function name: TransparentButton
  Summary: 투명한 스타일의 버튼 컴포넌트
  Parameter: 총 2개
             string text; 버튼에 표시될 텍스트
             function onClick; 버튼 클릭 시 호출되는 함수
  Return: 총 1개; 투명한 버튼을 포함한 JSX 컴포넌트
  Caller: 다양한 컴포넌트에서 호출 가능
  Date: 2024.09.21
  Write by: 길정수
*/
const TransparentButton = ({ text, onClick }) => {
  /*
    JSX: 투명한 버튼을 표시하는 컴포넌트 구조
  */
  return (
    <button className="TransparentButton" onClick={onClick}>
      {text}
    </button>
  );
};

export default TransparentButton;
