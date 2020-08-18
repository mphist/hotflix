import React from "react";
import "./Billboard.scss";

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const int = Math.floor(Math.random() * (max - min)) + min; //excluding max
  return int;
}

const Billboard: React.FunctionComponent = () => {
  return (
    <div className="billboard-wrapper">
      <img
        src={
          process.env.PUBLIC_URL +
          `/billboard/billboard-img-${getRandomInt(1, 12)}.jpg`
        }
        alt="billboard"
        draggable="false"
      />
    </div>
  );
};

export default Billboard;
