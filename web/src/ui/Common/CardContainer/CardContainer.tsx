import React, { FunctionComponent, useState } from "react";
import Card from "../Card/Card";
import "./CardContainer.scss";

interface Cards {
  category: string;
  text: string;
}

interface Props {
  cards: Cards[];
}

const CardContainer: FunctionComponent<Props> = ({ cards }: Props) => {
  const [load, setLoad] = useState(false);
  setTimeout(() => {
    setLoad(true);
  }, 500);

  if (!load) {
    return <div className="contents-wrapper"></div>;
  }
  return (
    <div className="contents-wrapper">
      {cards.map((card, key) => (
        <Card key={key} category={card.category} text={card.text} />
      ))}
    </div>
  );
};

export default CardContainer;
