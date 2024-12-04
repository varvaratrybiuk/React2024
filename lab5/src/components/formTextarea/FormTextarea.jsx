import style from "./FormTextareaStyle.module.css";
import { useFormContext } from "react-hook-form";

export default function FormTextarea(props) {
  const { fieldKey, title, placeholderText, requiredText, validationOptions } =
    props;
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
          required: requiredText ? requiredText : false,
          ...validationOptions,
        })}
      />
      {errors[fieldKey] && <span>{errors[fieldKey].message}</span>}
    </div>
  );
}
