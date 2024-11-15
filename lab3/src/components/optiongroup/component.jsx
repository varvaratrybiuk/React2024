import style from "./style.module.css";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import OptionItem from "./optionItem.jsx";

export default function OptionGroup(props) {
  const { description, options, fieldname } = props;
  const { control, setValue, getValues } = useFormContext();
  const [expandedOptions, setExpandedOptions] = useState({});
  //Винести
  const checkAllFalse = (obj) => {
    return Object.values(obj).every((value) => {
      if (typeof value === "object" && value !== null) {
        return checkAllFalse(value);
      }
      return value === false;
    });
  };
  const updateValues = (newValues) => {
    Object.entries(newValues).forEach(([key, value]) => {
      setValue(key, value);
    });
    const allValues = getValues(fieldname) || {};
    if (checkAllFalse(allValues)) {
      setValue(`${fieldname}.any`, true);
    }
  };
  const addCheckedValues = (optionKey, isChecked) => {
    const allValues = getValues(fieldname) || {};
    const newValues = [];

    if (optionKey === `${fieldname}.any`) {
      Object.keys(allValues).forEach((key) => {
        if (key !== "any") {
          newValues[`${fieldname}.${key}`] = false;
        }
      });
      setExpandedOptions({});
      newValues[`${fieldname}.any`] = true;
    } else {
      newValues[optionKey] = isChecked;
      setExpandedOptions((prev) => ({
        ...prev,
        [optionKey]: isChecked,
      }));
      newValues[`${fieldname}.any`] = false;
    }

    updateValues(newValues);
  };

  return (
    <div className={style["option-group"]}>
      <label className={style["description"]}>{description}</label>
      <div className={style["checkbox-list"]}>
        <div key={`${fieldname}.any`}>
          <OptionItem
            name={`${fieldname}.any`}
            value="Будь-який"
            onChange={(e) =>
              addCheckedValues(`${fieldname}.any`, e.target.checked)
            }
            checked={true}
          />
        </div>

        {options.map((option) => {
          const [key, value] = Object.entries(option)[0];
          const nestedData = Object.entries(option)[1];

          const currentKey = `${fieldname}.${key}`;

          return (
            <div key={currentKey}>
              <OptionItem
                name={`${currentKey}`}
                value={value}
                onChange={(e) =>
                  addCheckedValues(`${currentKey}`, e.target.checked)
                }
              />
              {expandedOptions[currentKey] && hasNestedOptions(nestedData) && (
                <div className={style["nested-options"]}>
                  {nestedData[1].map((item) => {
                    const [subKey, subValue] = Object.entries(item)[0];
                    return (
                      <div key={`${currentKey}.${subKey}`}>
                        <OptionItem
                          name={`${currentKey}.${subKey}`}
                          value={subValue}
                          onChange={(e) =>
                            addCheckedValues(
                              `${currentKey}.${subKey}`,
                              e.target.checked
                            )
                          }
                          checked={true}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
const hasNestedOptions = (nestedData) =>
  nestedData && Array.isArray(nestedData) && nestedData.length > 1;
