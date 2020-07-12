import React from "react";
import Billboard from "../Common/Billboard/Billboard";
import CardContainer from "../Common/CardContainer/CardContainer";

const cards = [
  { category: "trending", text: "Trending Now" },
  { category: "tv", text: "Popular TV Shows" },
  { category: "animation", text: "Popular Animation" },
];

const Home: React.FunctionComponent = () => {
  return (
    <div className="content">
      <div className="background" style={{ backgroundColor: "#141414" }}>
        <Billboard />
        <CardContainer cards={cards} />
      </div>
    </div>
  );
};

export default Home;
