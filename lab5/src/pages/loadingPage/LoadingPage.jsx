import style from "./LoadingPageStyle.module.css";

export default function LoadingPage() {
  return (
    <div className={style["loadingContainer"]}>
      Зачекайте сторінка завантажується.....
    </div>
  );
}
