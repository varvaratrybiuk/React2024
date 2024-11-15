import { DatePicker } from "antd";
import { useFormContext, Controller } from "react-hook-form";
import style from "./style.module.css";

export default function DataPicker(props) {
  const { description, fieldname } = props;
  const { control } = useFormContext();

  return (
    <div className={style.container}>
    <label className={style.label}>{description}</label>
    <Controller
      control={control}
      name={fieldname}
      render={({ field }) => (
        <DatePicker 
          {...field} 
          placeholder="Виберіть дату"
        />
      )}
    />
  </div>
  );
}
