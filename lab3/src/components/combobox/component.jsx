import React from "react";

export default function ComboBox(props) {
  const { description, options } = props;
  return (
    <div>
      <label>{description}</label>
      <select>
        {options.map((option, key) => (
          <option key={option.key} value={option.key}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
}
