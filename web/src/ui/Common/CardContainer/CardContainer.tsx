import React, { FunctionComponent } from "react";
import Card from "../Card/Card";

interface Cards {
  category: string;
  text: string;
}

interface Props {
  cards: Cards[];
}

const CardContainer: FunctionComponent<Props> = ({ cards }: Props) => {
  return (
    <div>
      {cards.map((card) => (
        <Card category={card.category} text={card.text} />
      ))}
    </div>
  );
};

export default CardContainer;
