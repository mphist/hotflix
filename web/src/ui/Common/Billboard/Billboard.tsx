import React from "react";
import "./Billboard.scss";

const Billboard: React.FunctionComponent = () => {
  return (
    <div className="billboard-wrapper">
      <img
        src={process.env.PUBLIC_URL + "/billboard-img.jpg"}
        alt="billboard"
        draggable="false"
      />
    </div>
  );
};

export default Billboard;
