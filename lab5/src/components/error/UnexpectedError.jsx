import style from "./ErrorStyle.module.css";
import { FinanceTrackerMachineContext } from "../../context/financeTrackerContext";

export default function UnexpectedError(props) {
  const { errorText } = props;
  const actor = FinanceTrackerMachineContext.useActorRef();

  return (
    <div className={style["errorContainer"]}>
      Сталася помилка: {errorText}
      <button
        onClick={() => actor.send({ type: "RETRY" })}
        className={style["errorButton"]}
      >
        Спробувати ще раз
      </button>
    </div>
  );
}
