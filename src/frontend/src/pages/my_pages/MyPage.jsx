import "./MyPage.css";
import MyPageMenuBox from "../../components/MyPageMenuBox";
import profileImage from "../../assets/defaultProfile.png";
import React from "react";
import useAuth from "../../hooks/useAuth";

const MyPage = () => {
  const { user } = useAuth();

  return (
    <div className="my-page">
      <div className="my-page__title">마이페이지</div>
      <div className="my-page__content">
        <div className="my-page__profile">
          <img
            className="my-page__img"
            src={user.donorProfileImage || profileImage}
            alt="Profile"
          />
          <div className="my-page__nickname">{user.donorNickname}</div>
        </div>

        <MyPageMenuBox menuName={"회원정보"} myPageLink={"/myinfo"} />
        <MyPageMenuBox menuName={"관심 수혜자"} myPageLink={"/myinterest"} />
        <MyPageMenuBox menuName={"기부 현황"} myPageLink={"/mystatus"} />
      </div>
    </div>
  );
};

export default MyPage;
