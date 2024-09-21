import React from "react"; // React 임포트
import "./Loading.css"; // CSS 파일 임포트
import spinner from "../../assets/spinner.gif"; // 로딩 스피너 이미지 임포트

/*
Function name: Loading
Summary: 로딩 중 표시되는 컴포넌트
Parameter: N/A
Return: 총 1개; 로딩 화면 컴포넌트
Caller: N/A
Date: 2024-09-22
Write by: 길정수
*/
const Loading = () => {
  return (
    <div className="loading">
      <div className="loading__text">잠시만 기다려 주세요.</div>{" "}
      {/* 로딩 텍스트 */}
      <img src={spinner} alt="로딩" /> {/* 로딩 스피너 이미지 */}
    </div>
  );
};

export default Loading; // Loading 컴포넌트 내보내기
