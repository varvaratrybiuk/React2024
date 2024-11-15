import { Controller, useFormContext } from "react-hook-form";
import { Checkbox } from "antd";

const OptionItem = (props) => {
  const { name, value, onChange, checked = false } = props;
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={checked}
      render={({ field }) => (
        <Checkbox
          {...field}
          checked={field.value}
          onChange={(e) => {
            field.onChange(e);
            onChange(e);
          }}
        >
          {value}
        </Checkbox>
      )}
    />
  );
};

export default OptionItem;
