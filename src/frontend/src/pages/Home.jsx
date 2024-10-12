import "./Home.css";
import React from "react";
import HomeSwiper from "../components/HomeSwiper"; // 마이페이지 메뉴 박스 컴포넌트 임포트


const Home = () => {
  return (
    <div className="home">
      <HomeSwiper />
    </div>
  );
};

export default Home;
