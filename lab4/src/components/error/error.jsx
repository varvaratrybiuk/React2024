import { Link, useRouteError } from "react-router-dom";

import style from "./errorStyle.module.css";

export default function Error() {
  const error = useRouteError();
  if (error.status == 500) {
    return (
      <div className={style["errorContainer"]}>
        <h1>Внутрішня помилка</h1>
        <p>Спробуйте ще раз або пізніше</p>
        <button value={"Спробувати ще раз"} onClick={()=>{}}/>
      </div>
    );
  }
  return (
    <div className={style["errorContainer"]}>
      <h1>Unexpected Error</h1>
      <p>{error?.message || "An unknown error occurred."}</p>
    </div>
  );
}
