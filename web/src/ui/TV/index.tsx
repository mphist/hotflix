import React from "react";
import Billboard from "../Common/Billboard/Billboard";
import CardContainer from "../Common/CardContainer/CardContainer";

const cards = [
  { category: "tv", text: "Popular on Hotflix" },
  { category: "tv_action", text: "Action & Adventure" },
  { category: "tv_crime", text: "Crime" },
  { category: "tv_documentary", text: "Documentary" },
];

const TV: React.FunctionComponent = () => {
  return (
    <div className="content">
      <div className="background" style={{ backgroundColor: "#141414" }}>
        <Billboard />
        <CardContainer cards={cards} />
      </div>
    </div>
  );
};

export default TV;
