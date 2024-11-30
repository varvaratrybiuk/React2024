import ExpenseAmountEditor from "../../components/expenseAmountEditor/ExpenseAmountEditor";
import ExpenseCard from "../../components/expenseCard/ExpenseCard";
import { useState } from "react";
import style from "./ManageStyle.module.css";
import data from "../../data/cards.json";

export default function Manage() {
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
      {selectedComponent === "expenseCard" && <ExpenseCard />}
      {selectedComponent === "expenseAmountEditor" && (
        <ExpenseAmountEditor cardsInform={data.cards} />
      )}
    </div>
  );
}
