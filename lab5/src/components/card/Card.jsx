import style from "./CardStyle.module.css";

export default function Card(props) {
  const { cardColor, title, amount, currency } = props;

  return (
    <div className={style["card"]} style={{ backgroundColor: cardColor }}>
      <p className={style["card-title"]}>{title}</p>
      <div>
        {amount} {currency}
      </div>
    </div>
  );
}
