import React, { useState } from "react";
import "./Billboard.scss";
import { useEffect } from "react";
import { getRandomInt } from "../util/getRandomInt";

//interface PropType {
//num: number;
//}

const Billboard: React.FunctionComponent = () => {
  const [num, setNum] = useState(0);

  useEffect(() => {
    setNum(getRandomInt(1, 12));
  }, []);

  return (
    <div className="billboard-wrapper">
      <img
        src={
          //process.env.PUBLIC_URL + `/billboard/billboard-img-1.jpg`
          process.env.PUBLIC_URL + `/billboard/billboard-img-${num}.jpg`
        }
        alt="billboard"
        draggable="false"
      />
    </div>
  );
};

export default Billboard;
