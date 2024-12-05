import { lazy } from "react";

const UnexpectedError = lazy(() => import("../error/UnexpectedError"));

import { FinanceTrackerMachineContext } from "../../context/financeTrackerContext";

import style from "./LoadingOrErrorWrapperStyle.module.css";

export default function LoadingOrErrorWrapper({ children }) {
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
