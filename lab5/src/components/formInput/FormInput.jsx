import { useFormContext } from "react-hook-form";

import style from "./FormInputStyle.module.css";

export default function FormInput(props) {
  const { fieldKey, title, placeholderText, requiredText, validationOptions } =
    props;
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={style["input-container"]}>
      <label htmlFor={fieldKey}>{title}</label>
      <input
        id={fieldKey}
        {...register(fieldKey, {
          required: requiredText ? requiredText : false,
          ...validationOptions,
        })}
        placeholder={placeholderText}
      />
      {errors[fieldKey] && <span>{errors[fieldKey].message}</span>}
    </div>
  );
}
