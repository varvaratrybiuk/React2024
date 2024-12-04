import { FinanceTrackerMachineContext } from "../../context/financeTrackerContext.jsx";

import Card from "../../components/card/Card";

import style from "./HomeStyle.module.css";
import Loading from "../../components/loading/Loading.jsx";

export default function Home() {
  const data = FinanceTrackerMachineContext.useSelector(
    (state) => state.context.cardsHolder
  );

  return (
    <div className={style["cards-container"]}>
      <h2>Мої витрати</h2>
      <Loading>
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
      </Loading>
    </div>
  );
}
