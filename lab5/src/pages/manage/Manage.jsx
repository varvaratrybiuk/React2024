import { useState, useContext } from "react";

import ExpenseAmountEditor from "../../components/expenseAmountEditor/ExpenseAmountEditor";
import ExpenseCard from "../../components/expenseCard/ExpenseCard";

import { FinanceTrackerContext } from "../../App";

import style from "./ManageStyle.module.css";
import { optionsColor, optionsCurrency } from "../../data/constants";

export default function Manage() {
  const [state, send] = useContext(FinanceTrackerContext);
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

      {selectedComponent === "expenseCard" && (
        <ExpenseCard
          send={send}
          optionsColor={optionsColor}
          optionsCurrency={optionsCurrency}
        />
      )}

      {selectedComponent === "expenseAmountEditor" && (
        <ExpenseAmountEditor
          cardsInform={state.context.cardsHolder}
          send={send}
        />
      )}
    </div>
  );
}
