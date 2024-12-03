import { useContext } from "react";
import Card from "../../components/card/Card";
import style from "./HomeStyle.module.css";
import { FinanceTrackerContext } from "../../App";

export default function Home() {
  const data = useContext(FinanceTrackerContext)[0].context.cardsHolder;

  return (
    <div className={style["cards-container"]}>
      <h2>Мої витрати</h2>
      {data.map((card) => (
        <Card
          key={card.id}
          cardColor={card.cardColor}
          title={card.title}
          amount={card.amount}
          currency={card.currency}
          history={card.history}
        />
      ))}
    </div>
  );
}
