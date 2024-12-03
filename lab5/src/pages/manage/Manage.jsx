import { useState, useEffect, useContext } from "react";
import { useLoaderData } from "react-router";

import ExpenseAmountEditor from "../../components/expenseAmountEditor/ExpenseAmountEditor";
import ExpenseCard from "../../components/expenseCard/ExpenseCard";

import { FinanceTrackerContext } from "../../App";

import style from "./ManageStyle.module.css";

export default function Manage() {
  const actor = useContext(FinanceTrackerContext);
  const initialCardsInform = useLoaderData();

  const [selectedComponent, setSelectedComponent] = useState(null);
  const [cardsInform, setCardsInform] = useState(initialCardsInform);

  useEffect(() => {
    actor.subscribe((snapshot) => {
      setCardsInform(snapshot.context.cardsHolder);
    });
  }, [actor]);

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
      {selectedComponent === "expenseCard" && <ExpenseCard actor={actor} />}
      {selectedComponent === "expenseAmountEditor" && (
        <ExpenseAmountEditor cardsInform={cardsInform} actor={actor} />
      )}
    </div>
  );
}
