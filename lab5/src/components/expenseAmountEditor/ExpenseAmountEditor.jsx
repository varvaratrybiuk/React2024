import { useForm, FormProvider } from "react-hook-form";
import { useState, useEffect } from "react";

import HistoryItem from "../historyItem/HistoryItem";
import FormInput from "../formInput/FormInput";
import FormTextarea from "../formTextarea/FormTextarea";
import List from "../list/List";
import Card from "../card/Card";

import style from "./ExpenseAmountEditorStyle.module.css";

export default function ExpenseAmountEditor(props) {
  const { cardsInform, actor } = props;

  const [visibleInfo, setVisibleInfo] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const onSubmit = (data, cardId) => {
    actor.send({
      type: "ADD_EXPENSE",
      amount: data.amount,
      description: data.description,
      cardId,
    });
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
                  className={style["button-submit"]}
                  onClick={() => deleteCard(cardInform.id)}
                >
                  Видалити картку
                </button>
                <button
                  className={style["button-submit"]}
                  onClick={() => toggleInfoVisibility(cardInform.id, "form")}
                >
                  {visibleInfo[cardInform.id]?.form
                    ? "Сховати форму"
                    : "Додати витрати"}
                </button>
              </div>

              {visibleInfo[cardInform.id]?.form && (
                <FormProvider {...{ register, formState: { errors } }}>
                  <form
                    onSubmit={handleSubmit((data) =>
                      onSubmit(data, cardInform.id)
                    )}
                  >
                    <FormInput
                      fieldKey="amount"
                      title="Сума витрат"
                      placeholderText="Введіть суму витрат"
                      requiredText="Сума витрат є обов'язковою"
                      validationOptions={{
                        valueAsNumber: true,
                        min: { value: 0, message: "Сума має бути додатньою" },
                      }}
                    />
                    <FormTextarea
                      fieldKey="description"
                      title="Опис витрати"
                      placeholderText="Додайте опис витрати"
                      requiredText="Опис є обов'язковим"
                    />
                    <button className={style["button-submit"]} type="submit">
                      Додати у витрати
                    </button>
                  </form>
                </FormProvider>
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
