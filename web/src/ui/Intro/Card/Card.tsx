import React from "react";
import "./Card.scss";

interface Props {
  header: string;
  text: string;
  image: string;
  video?: string;
  number: string;
}

const Card: React.FunctionComponent<Props> = ({
  header,
  text,
  image,
  video,
  number,
}: Props) => {
  return (
    <div className="card-wrapper">
      <div className="card-text">
        <h1>{header}</h1>
        <h3>{text}</h3>
      </div>
      <div className="card-animation">
        <div className={`card-image-${number}`}>
          <img src={process.env.PUBLIC_URL + image} />
        </div>
        <div className={`card-video-${number}`}>
          <video width="370" height="240" autoPlay loop playsInline muted>
            <source src={process.env.PUBLIC_URL + video} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default Card;
