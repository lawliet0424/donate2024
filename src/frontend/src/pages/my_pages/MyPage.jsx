import "./MyPage.css"; // 스타일시트 임포트
import MyPageMenuBox from "../../components/MyPageMenuBox"; // 마이페이지 메뉴 박스 컴포넌트 임포트
import profileImage from "../../assets/defaultProfile.png"; // 기본 프로필 이미지 임포트
import React from "react"; // React 라이브러리 임포트
import useAuth from "../../hooks/useAuth"; // 인증 훅 임포트

/*
Function name: MyPage
Summary: 사용자의 마이페이지 정보를 표시하는 컴포넌트
Parameter: 총 0개
Return: 총 1개; MyPage 컴포넌트
Caller: React 애플리케이션의 렌더링 과정
Date: 2024-09-22
Write by: 길정수 
*/
const MyPage = () => {
  const { user } = useAuth(); // 사용자 정보를 가져옴

  return (
    <div className="my-page">
      {" "}
      {/* 마이페이지 컴포넌트 래퍼 */}
      <div className="my-page__title">마이페이지</div> {/* 제목 표시 */}
      <div className="my-page__content">
        {" "}
        {/* 페이지 내용 래퍼 */}
        <div className="my-page__profile">
          {" "}
          {/* 프로필 정보 표시 */}
          <img
            className="my-page__img"
            src={user.donorProfileImage || profileImage} // 프로필 이미지 설정
            alt="Profile"
          />
          <div className="my-page__nickname">{user.donorNickname}</div>{" "}
          {/* 닉네임 표시 */}
        </div>
        {/* 마이페이지 메뉴 박스 */}
        <MyPageMenuBox menuName={"회원정보"} myPageLink={"/myinfo"} />
        <MyPageMenuBox menuName={"관심 수혜자"} myPageLink={"/myinterest"} />
        <MyPageMenuBox menuName={"기부 현황"} myPageLink={"/myhistory"} />
      </div>
    </div>
  );
};

export default MyPage; // MyPage 컴포넌트 내보내기
