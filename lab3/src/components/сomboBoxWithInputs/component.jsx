import ComboBox from "../combobox/component";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function ComboBoxWithInputs(props) {
  const { description, options, fieldname, inputPlaceholder } = props;
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldname,
  });

  const addFields = (quantity) => {
    const currentLength = fields.length;
    const numValue = parseInt(quantity, 10) || 0;
    console.log(numValue);
    if (numValue > currentLength) {
      for (let i = currentLength; i < numValue; i++) {
        append();
      }
    } else if (numValue < currentLength) {
      for (let i = currentLength - 1; i >= numValue; i--) {
        remove(i);
      }
    }
  };
  return (
    <>
      <ComboBox
        description={description}
        options={options}
        fieldname={fieldname}
        onChange={(value) => {
          addFields(value);
        }}
      />
      <span>
        {fields.map((field, index) => (
          <input
            key={field.id}
            {...register(`${fieldname}.${index}`)}
            placeholder={inputPlaceholder}
          />
        ))}
      </span>
    </>
  );
}
