import React from "react";
import Header from "./ui/Intro/Header/Header";
import Background from "./ui/Intro/Background/Background";
import Card from "./ui/Intro/Card/Card";

import "./App.scss";

const cards = [
  {
    header: "Enjoy on your TV.",
    text:
      "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
    image: "/tv.png",
    video: "/card-1.m4v",
    number: "1",
  },
  {
    header: "Watch everywhere.",
    text:
      "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without paying more.",
    image: "/mac.png",
    video: "/card-3.m4v",
    number: "3",
  },
];

const App: React.FunctionComponent = () => {
  return (
    <div className="main">
      <Header login />
      <Background login />
      {cards.map((card) => (
        <Card {...card} />
      ))}
    </div>
  );
};

export default App;
