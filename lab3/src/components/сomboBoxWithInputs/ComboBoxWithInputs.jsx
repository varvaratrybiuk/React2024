import { useFieldArray, useFormContext } from "react-hook-form";
import ComboBox from "../comboBox/ComboBox";
import style from "./ComboBoxWithInputsStyle.module.css";

export default function ComboBoxWithInputs(props) {
  const { description, options, fieldname, inputPlaceholder } = props;
  const { control, register, setValue, errors } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${fieldname}.inputs`,
  });

  const handleComboBoxChange = (quantity) => {
    const numValue = parseInt(quantity, 10);
    setValue(`${fieldname}.comboBox`, quantity);
    remove();
    for (let i = 0; i < numValue; i++) {
      append({ value: "" });
    }
  };

  return (
    <div className={style["combo-input-container"]}>
      <ComboBox
        description={description}
        options={options}
        fieldname={`${fieldname}.comboBox`}
        onChange={(value) => {
          handleComboBoxChange(value);
        }}
      />
      {fields.map((field, index) => (
        <div key={field.id} className={style["custom-input-container"]}>
          <input
            {...register(`${fieldname}.inputs.${index}.value`)}
            placeholder={inputPlaceholder}
            className={style["custom-input"]}
          />
          {errors[fieldname] &&
            errors[fieldname].inputs &&
            errors[fieldname].inputs[index] &&
            errors[fieldname].inputs[index].value && (
              <p className={style["error-message"]}>
                {errors[fieldname].inputs[index].value.message}
              </p>
            )}
        </div>
      ))}
    </div>
  );
}
