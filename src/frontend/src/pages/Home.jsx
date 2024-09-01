import "./Home.css";
import React from "react";
import homeIntroImage from "../assets/homeIntroImage.png";

const Home = () => {
  return (
    <div className="Home">
      <img className="homeIntroImage" src={homeIntroImage} alt="Beneficiary" />
    </div>
  );
};

export default Home;
