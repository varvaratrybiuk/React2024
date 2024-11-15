import { useFormContext, Controller } from "react-hook-form";
import style from "./style.module.css";
import { Select } from "antd";

export default function ComboBox(props) {
  const { description, options, fieldname, onChange } = props;
  const { control } = useFormContext();

  return (
    <div className={style.container}>
      <label className={style.label}>{description}</label>
      <Controller
        control={control}
        name={fieldname}
        render={({ field }) => (
          <Select
            {...field}
            options={options.map((option) => {
              const key = Object.keys(option)[0];
              const value = Object.values(option)[0];
              return {
                value: key,
                label: value,
              };
            })}
          />
        )}
      />
    </div>
  );
}
