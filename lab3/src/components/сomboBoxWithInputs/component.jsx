import { useFieldArray, useFormContext } from "react-hook-form";
import ComboBox from "../comboBox/component";
import style from "./style.module.css";

export default function ComboBoxWithInputs(props) {
  const { description, options, fieldname, inputPlaceholder } = props;
  const { control, register, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${fieldname}.inputs`,
  });

  const handleComboBoxChange = (quantity) => {
    const numValue = parseInt(quantity, 10);
    setValue(fieldname, quantity);
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
        fieldname={fieldname}
        onChange={(value) => {
          handleComboBoxChange(value);
        }}
      />
      {fields.map((field, index) => (
        <input
          key={field.id}
          {...register(`${fieldname}.inputs.${index}.value`)}
          placeholder={inputPlaceholder}
          className={style["custom-input"]}
        />
      ))}
    </div>
  );
}
