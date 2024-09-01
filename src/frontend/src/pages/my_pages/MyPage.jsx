import "./MyPage.css";
import MyPageMenuBox from "../../components/MyPageMenuBox";
import profileImage from "../../assets/defaultProfile.png";
import { AuthContext } from "../../context/AuthContext";
import React, { useState, useEffect, useContext } from "react";

const MyPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="MyPage">
      <div className="title">마이페이지</div>
      <div className="MyPageContent">
        <div className="userInfo">
          <img
            className="myProfileImage"
            src={user.donorProfileImage || profileImage}
            alt="Profile"
          />
          <div className="nickname">{user.donorNickname}</div>
        </div>

        <MyPageMenuBox menuName={"회원정보"} myPageType={"/myinfo"} />
        <MyPageMenuBox
          menuName={"나의 관심 수혜자"}
          myPageType={"/myinterest"}
        />
        <MyPageMenuBox menuName={"나의 기부 현황"} myPageType={"/mystatus"} />
      </div>
    </div>
  );
};

export default MyPage;
