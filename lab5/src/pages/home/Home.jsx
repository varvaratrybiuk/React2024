import Card from "../../components/card/Card";
import data from "../../data/cards.json";
import style from "./HomeStyle.module.css";

export default function Home() {
  return (
    <div className={style["cards-container"]}>
      <h2>Мої витрати</h2>
      {data.cards.map((card) => (
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
