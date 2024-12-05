import Card from "../../components/card/Card.jsx";
import LoadingOrErrorWrapperStyle from "../../components/loadingOrErrorWrapper/LoadingOrErrorWrapper.jsx";

import { FinanceTrackerMachineContext } from "../../context/financeTrackerContext.jsx";

import style from "./HomeStyle.module.css";

export default function Home() {
  const data = FinanceTrackerMachineContext.useSelector(
    (state) => state.context.cardsHolder
  );

  return (
    <div className={style["cards-container"]}>
      <h2>Мої витрати</h2>
      <LoadingOrErrorWrapperStyle>
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
      </LoadingOrErrorWrapperStyle>
    </div>
  );
}
