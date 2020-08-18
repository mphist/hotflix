import React from "react";
import Billboard from "../Common/Billboard/Billboard";
import CardContainer from "../Common/CardContainer/CardContainer";

const cards = [{ category: "new_movies", text: "New Movies" }];

const Latest: React.FunctionComponent = () => {
  return (
    <div className="content">
      <div className="background" style={{ backgroundColor: "#141414" }}>
        <Billboard />
        <CardContainer cards={cards} />
      </div>
    </div>
  );
};

export default Latest;
