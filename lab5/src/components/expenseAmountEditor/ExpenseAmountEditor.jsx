import { useState, useEffect, lazy } from "react";

const HistoryItem = lazy(() => import("../historyItem/HistoryItem"));
const List = lazy(() => import("../list/List"));
const AddExpenseForm = lazy(() => import("../addExpenseForm/AddExpenseForm"));
import Card from "../card/Card";

import { FinanceTrackerMachineContext } from "../../context/financeTrackerContext";

import style from "./ExpenseAmountEditorStyle.module.css";
import buttonStyles from "../../styles/buttonsStyle.module.css";

export default function ExpenseAmountEditor(props) {
  const { cardsInform } = props;
  const actor = FinanceTrackerMachineContext.useActorRef();

  const [visibleInfo, setVisibleInfo] = useState({});

  useEffect(() => {
    actor.send({ type: "SELECT_CARD" });
  }, [actor]);

  const toggleInfoVisibility = (cardId, key) => {
    setVisibleInfo((prevState) => ({
      ...prevState,
      [cardId]: {
        ...prevState[cardId],
        [key]: !prevState[cardId]?.[key],
      },
    }));
  };

  const deleteCard = (cardId) => {
    actor.send({ type: "DELETE_CARD", cardId });
  };

  return (
    <div>
      {cardsInform.map((cardInform) => (
        <div key={cardInform.id} className={style["expense-amount-editor"]}>
          <div onClick={() => toggleInfoVisibility(cardInform.id, "info")}>
            <Card
              cardColor={cardInform.cardColor}
              title={cardInform.title}
              amount={cardInform.amount}
              currency={cardInform.currency}
            />
          </div>

          {visibleInfo[cardInform.id]?.info && (
            <div>
              <div className={style["buttons-contaner"]}>
                <button
                  className={buttonStyles["pink-button"]}
                  onClick={() => deleteCard(cardInform.id)}
                >
                  Видалити картку
                </button>
                <button
                  className={buttonStyles["pink-button"]}
                  onClick={() => toggleInfoVisibility(cardInform.id, "form")}
                >
                  {visibleInfo[cardInform.id]?.form
                    ? "Сховати форму"
                    : "Додати витрати"}
                </button>
              </div>

              {visibleInfo[cardInform.id]?.form && (
                <AddExpenseForm cardId={cardInform.id} />
              )}

              <div>
                <List
                  items={cardInform.history}
                  renderItem={(value) => (
                    <HistoryItem
                      date={value.date}
                      description={value.description}
                      amount={value.amount}
                    />
                  )}
                  emptyMessage="Історія відсутня."
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
