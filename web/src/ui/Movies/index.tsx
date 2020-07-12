import React from "react";
import Billboard from "../Common/Billboard/Billboard";
import CardContainer from "../Common/CardContainer/CardContainer";

const cards = [{ category: "movies", text: "Popular Movies" }];

const Movies: React.FunctionComponent = () => {
  return (
    <div className="content">
      <div className="background" style={{ backgroundColor: "#141414" }}>
        <Billboard />
        <CardContainer cards={cards} />
      </div>
    </div>
  );
};

export default Movies;
