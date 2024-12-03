import { useForm, FormProvider } from "react-hook-form";
import FormSelect from "../formSelect/FormSelect";
import style from "./ExpenseCardStyle.module.css";
import FormInput from "../formInput/FormInput";

const optionsCurrency = [{ USD: "USD" }, { EUR: "EUR" }, { UAH: "UAH" }];

const optionsColor = [
  { "#87CEEB": "Sky Blue" },
  { "#FA8072": "Salmon" },
  { "#3CB371": "Medium Sea Green" },
  { "#C71585": "Medium Violet Red" },
  { "#FF1493": "Deep Pink" },
  { "#FFFACD": "Lemon Chiffon" },
];

export default function ExpenseCard(props) {
  const { actor } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  

  const onSubmit = (data) => {
    actor.send({ type: "ADD_CARD", card: data });
  };
  return (
    <div className={style["form-container"]}>
      <h2>Додати карту для трекінгу витрат</h2>
      <FormProvider {...{ register, formState: { errors } }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            fieldKey="title"
            title="Назва картки"
            placeholderText="Введіть назву карти"
            requiredText="Назва карти обов'язкова"
          />
          <FormSelect
            title="Валюта"
            fieldKey="currency"
            options={optionsCurrency}
          />
          <FormSelect
            title="Колір карти"
            fieldKey="cardColor"
            options={optionsColor}
          />
          <button className={style["button-submit"]} type="submit">
            Додати карту
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
