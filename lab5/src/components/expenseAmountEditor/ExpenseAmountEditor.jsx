import Card from "../card/Card";
import { useForm, FormProvider } from "react-hook-form";
import style from "./ExpenseAmountEditorStyle.module.css";
import HistoryItem from "../historyItem/HistoryItem";
import FormInput from "../formInput/FormInput";

export default function ExpenseAmountEditor(props) {
  const { cardsInform } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      {cardsInform.map((cardInform) => (
        <div key={cardInform.id} className={style["expense-amount-editor"]}>
          <Card
            cardColor={cardInform.cardColor}
            title={cardInform.title}
            amount={cardInform.amount}
            currency={cardInform.currency}
          />
          <div>
            <FormProvider {...{ register, formState: { errors } }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                  fieldKey="amount"
                  title="Сума витрат"
                  placeholderText="Введіть суму витрат"
                  requiredText="Сума витрат є обов'язковою"
                />
                <div className={style["description-container"]}>
                  <label htmlFor="description">Опис витрати:</label>
                  <textarea
                    id="description"
                    placeholder="Додайте опис витрати"
                    {...register("description", {
                      required: "Опис є обов'язковим",
                    })}
                  />
                  {errors.description && (
                    <span>{errors.description.message}</span>
                  )}
                </div>
                <button className={style["button-submit"]} type="submit">
                  Додати у витрати
                </button>
              </form>
            </FormProvider>
          </div>
          <div>
            <ul className={style["history-holder"]}>
              {cardInform.history && cardInform.history.length > 0 ? (
                cardInform.history.map((value) => (
                  <li key={value.id}>
                    <HistoryItem
                      date={value.date}
                      description={value.description}
                      amount={value.amount}
                    />
                  </li>
                ))
              ) : (
                <p>Історія відсутня.</p>
              )}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
