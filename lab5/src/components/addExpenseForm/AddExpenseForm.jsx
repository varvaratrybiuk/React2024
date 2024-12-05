import { useForm, FormProvider } from "react-hook-form";

import FormInput from "../formInput/FormInput";
import FormTextarea from "../formTextarea/FormTextarea";

import { FinanceTrackerMachineContext } from "../../context/financeTrackerContext";

import buttonStyles from "../../styles/buttonsStyle.module.css";

export default function AddExpenseForm(props) {
  const { cardId } = props;
  const actor = FinanceTrackerMachineContext.useActorRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data, cardId) => {
    actor.send({
      type: "ADD_EXPENSE",
      amount: data.amount,
      description: data.description,
      cardId,
    });
  };
  return (
    <FormProvider {...{ register, formState: { errors } }}>
      <form onSubmit={handleSubmit((data) => onSubmit(data, cardId))}>
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
        <button className={buttonStyles["pink-button"]} type="submit">
          Додати у витрати
        </button>
      </form>
    </FormProvider>
  );
}
