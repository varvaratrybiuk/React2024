import { Controller } from "react-hook-form";
import OptionItem from "./optionItem";

export const OptionItemController = (
  name,
  value,
  control,
  onChange,
  checked = false
) => (
  <Controller
    name={name}
    control={control}
    defaultValue={checked}
    render={({ field }) => (
      <OptionItem
        optionKey={field.name}
        value={value}
        checked={field.value}
        onChange={onChange}
      />
    )}
  />
);
