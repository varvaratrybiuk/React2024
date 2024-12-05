import style from "./ListStyle.module.css";

export default function List(props) {
  const { items, renderItem, emptyMessage = "Список порожній" } = props;
  return (
    <ul className={style["list-holder"]}>
      {items && items.length > 0 ? (
        items.map((item, index) => (
          <li key={item.id || index}>{renderItem(item)}</li>
        ))
      ) : (
        <p>{emptyMessage}</p>
      )}
    </ul>
  );
}
