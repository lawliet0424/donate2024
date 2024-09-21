import "./Home.css";
import React from "react";
import homeIntroImage from "../assets/homeIntroImage.png";

const Home = () => {
  return (
    <div className="home">
      <img className="home__img" src={homeIntroImage} />
    </div>
  );
};

export default Home;
