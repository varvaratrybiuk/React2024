import { useNavigate } from "react-router-dom";

import style from "../ErrorStyle.module.css";

export default function UnexpectedError(props) {
  const { error } = props;
  const navigate = useNavigate();
  return (
    <div className={style["errorContainer"]}>
      <h1>Unexpected Error</h1>
      <p>{error?.data || "An unknown error occurred."}</p>
      <div className={style["errorButtonsContainer"]}>
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
