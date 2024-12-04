import { useState } from "react";

import ExpenseAmountEditor from "../../components/expenseAmountEditor/ExpenseAmountEditor";
import ExpenseCard from "../../components/expenseCard/ExpenseCard";

import { FinanceTrackerMachineContext } from "../../context/financeTrackerContext.jsx";

import style from "./ManageStyle.module.css";
import { optionsColor, optionsCurrency } from "../../data/constants";
import Loading from "../../components/loading/Loading.jsx";

export default function Manage() {
  const cards = FinanceTrackerMachineContext.useSelector(
    (state) => state.context.cardsHolder
  );
  const actorRef = FinanceTrackerMachineContext.useActorRef();
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleSelectComponent = (component) => {
    setSelectedComponent(component);
  };


  return (
    <div className={style["manage-container"]}>
      <ul className={style["options-container"]}>
        <li
          className={style["options"]}
          onClick={() => handleSelectComponent("expenseAmountEditor")}
        >
          Додати кошти у витрати
        </li>
        <li
          className={style["options"]}
          onClick={() => handleSelectComponent("expenseCard")}
        >
          Додати карту
        </li>
      </ul>
      <Loading>
        {selectedComponent === "expenseCard" && (
          <ExpenseCard
            actor={actorRef}
            optionsColor={optionsColor}
            optionsCurrency={optionsCurrency}
          />
        )}

        {selectedComponent === "expenseAmountEditor" && (
          <ExpenseAmountEditor cardsInform={cards} actor={actorRef} />
        )}
      </Loading>
    </div>
  );
}
