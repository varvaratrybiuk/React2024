import { useState, lazy } from "react";

const ExpenseAmountEditor = lazy(() =>
  import("../../components/expenseAmountEditor/ExpenseAmountEditor")
);
const ExpenseCard = lazy(() =>
  import("../../components/expenseCard/ExpenseCard")
);
import LoadingOrErrorWrapperStyle from "../../components/loadingOrErrorWrapper/LoadingOrErrorWrapper.jsx";

import { FinanceTrackerMachineContext } from "../../context/financeTrackerContext.jsx";
import { COLOR_OPTIONS, CURRENCY_OPTIONS } from "../../constants/constants.js";

import style from "./ManageStyle.module.css";
import buttonStyles from "../../styles/buttonsStyle.module.css";

export default function Manage() {
  const cards = FinanceTrackerMachineContext.useSelector(
    (state) => state.context.cardsHolder
  );

  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleSelectComponent = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className={style["manage-container"]}>
      <ul className={style["options-container"]}>
        <li
          className={buttonStyles["pink-button"]}
          onClick={() => handleSelectComponent("expenseAmountEditor")}
        >
          Додати кошти у витрати
        </li>
        <li
          className={buttonStyles["pink-button"]}
          onClick={() => handleSelectComponent("expenseCard")}
        >
          Додати карту
        </li>
      </ul>
      <LoadingOrErrorWrapperStyle>
        {selectedComponent === "expenseCard" && (
          <ExpenseCard
            optionsColor={COLOR_OPTIONS}
            optionsCurrency={CURRENCY_OPTIONS}
          />
        )}

        {selectedComponent === "expenseAmountEditor" && (
          <ExpenseAmountEditor cardsInform={cards} />
        )}
      </LoadingOrErrorWrapperStyle>
    </div>
  );
}
