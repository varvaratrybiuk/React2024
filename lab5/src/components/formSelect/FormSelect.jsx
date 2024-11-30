import { useFormContext } from "react-hook-form";
import style from "./FormSelectStyle.module.css";

export default function FormSelect(props) {
  const { options, fieldKey, title } = props;
  const { register } = useFormContext();

  return (
    <div className={style["form-select-container"]}>
      <label htmlFor={`${fieldKey}`}>{title}:</label>
      <select {...register(fieldKey)} id={`${fieldKey}`}>
        {options.map((value) => {
          const optionKey = Object.keys(value)[0];
          const optionValue = Object.values(value)[0];
          return (
            <option key={`${fieldKey}-${optionKey}`} value={optionKey}>
              {optionValue}
            </option>
          );
        })}
      </select>
    </div>
  );
}
