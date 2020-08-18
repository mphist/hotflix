import React, { FunctionComponent } from "react";
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
  return (
    <div className="contents-wrapper">
      {cards.map((card, key) => (
        <Card key={key} category={card.category} text={card.text} />
      ))}
    </div>
  );
};

export default CardContainer;
