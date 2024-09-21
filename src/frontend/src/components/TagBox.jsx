import "./TagBox.css";
import React from "react";

/*
  Function name: TagBox
  Summary: 태그 선택 버튼 컴포넌트
  Parameter: 총 3개
             string tagName; 태그 이름
             boolean isTagSelected; 태그가 선택되었는지 여부
             function onTagClick; 태그 클릭 시 호출되는 함수
  Return: 총 1개; 태그 버튼을 포함한 JSX 컴포넌트
  Caller: 태그 선택과 관련된 컴포넌트에서 호출 가능
  Date: 2024.09.21
  Write by: 길정수
*/
const TagBox = ({ tagName, isTagSelected, onTagClick }) => {
  /*
    동적으로 태그 버튼의 클래스명 설정
  */
  const buttonClass = `TagBox ${isTagSelected ? "TagBox--selected" : ""}`;

  /*
    JSX: 태그 이름을 표시하는 버튼 컴포넌트 구조
  */
  return (
    <button onClick={onTagClick} className={buttonClass}>
      {tagName}
    </button>
  );
};

export default TagBox;
