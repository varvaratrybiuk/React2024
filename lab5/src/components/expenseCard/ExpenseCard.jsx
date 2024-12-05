import { useForm, FormProvider } from "react-hook-form";

import FormSelect from "../formSelect/FormSelect";
import FormInput from "../formInput/FormInput";

import { FinanceTrackerMachineContext } from "../../context/financeTrackerContext";

import style from "./ExpenseCardStyle.module.css";
import buttonStyles from "../../styles/buttonsStyle.module.css";

export default function ExpenseCard(props) {
  const { optionsCurrency, optionsColor } = props;
  const actor = FinanceTrackerMachineContext.useActorRef();
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
          <button className={buttonStyles["pink-button"]} type="submit">
            Додати карту
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
