import style from "./FormTextareaStyle.module.css";
import { useFormContext } from "react-hook-form";

export default function FormTextarea(props) {
  const { fieldKey, title, placeholderText, requiredText } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={style["description-container"]}>
      <label htmlFor={fieldKey}>{title}</label>
      <textarea
        id={fieldKey}
        placeholder={placeholderText}
        {...register(fieldKey, {
          required: { requiredText },
        })}
      />
      {errors.description && <span>{errors.description.message}</span>}
    </div>
  );
}
