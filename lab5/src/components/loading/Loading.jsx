import { FinanceTrackerMachineContext } from "../../context/financeTrackerContext";
import UnexpectedError from "../error/UnexpectedError";
import style from "./LoadingStyle.module.css";

export default function Loading({ children }) {
  const errorText = FinanceTrackerMachineContext.useSelector(
    (state) => state.context.errorMessage
  );
  const loading = FinanceTrackerMachineContext.useSelector(
    (state) => state.value
  );

  return (
    <div className={style["container"]}>
      {errorText ? (
        <UnexpectedError errorText={errorText} />
      ) : loading === "loadingCards" ? (
        <div>Завантаження контенту....</div>
      ) : (
        children
      )}
    </div>
  );
}
