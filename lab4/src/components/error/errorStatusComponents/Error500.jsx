import { useNavigate } from "react-router-dom";

import style from "../ErrorStyle.module.css";

export default function Error500(props) {
  const { error } = props;
  const navigate = useNavigate();
  return (
    <div className={style["errorContainer"]}>
      <h1>Oops... {error?.data}</h1>
      <p>Try Again or Return Home</p>
      <div className={style["errorButtonsContainer"]}>
        <button
          className={style["errorButton"]}
          title="Try Again"
          onClick={() => {
            navigate(0);
          }}
        >
          Try Again
        </button>
        <button
          className={style["errorButton"]}
          title="Home"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </button>
      </div>
    </div>
  );
}
