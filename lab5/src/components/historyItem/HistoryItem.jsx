import style from "./HistoryItemStyle.module.css";

export default function HistoryItem(props) {
  const { date, description, amount } = props;
  return (
    <div className={style["history-item"]}>
      <span>{date}</span>
      <p>{description}</p>
      <p>
        <span>Сума:</span> {amount}
      </p>
    </div>
  );
}
