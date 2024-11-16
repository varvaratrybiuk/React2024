import { InputNumber } from "antd";
import { useFormContext, Controller } from "react-hook-form";
import style from "./NumberSelectorStyle.module.css";

export default function NumberSelector(props) {
  const { description, fieldname } = props;
  const { control } = useFormContext();
  return (
    <div className={style.container}>
      <label className={style.label}>{description}</label>
      <Controller
        control={control}
        name={fieldname}
        render={({ field }) => <InputNumber {...field} />}
      />
    </div>
  );
}
