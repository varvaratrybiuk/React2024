import style from "./style.module.css";
import { useFormContext } from "react-hook-form";
import { useReducer } from "react";
import { OptionItemController } from "./optionItemController.jsx";

export default function OptionGroup(props) {
  const { description, options, fieldname } = props;
  const { control, setValue, getValues } = useFormContext();
  const [expandedOptions, dispatch] = useReducer(reducer, {});
  const updateValues = (newValues) => {
    Object.entries(newValues).forEach(([key, value]) => {
      setValue(key, value);
    });
  };
  const addCheckedValues = (optionKey, isChecked) => {
    const allValues = getValues(fieldname) || {};
    const newValues = [];

    if (optionKey === `${fieldname}.any`) {
      Object.keys(allValues).forEach((key) => {
        if (key !== "any") {
          newValues[`${fieldname}.${key}`] = false;
          dispatch({ key: `${fieldname}.${key}`, type: "hide" });
        }
      });
      newValues[`${fieldname}.any`] = true;
    } else {
      newValues[optionKey] = isChecked;
      dispatch({ key: optionKey, type: isChecked ? "show" : "hide" });
      newValues[`${fieldname}.any`] = false;
    }

    updateValues(newValues);
  };

  return (
    <div className={style["option-group"]}>
      <label className={style["description"]}>{description}</label>
      <div className={style["checkbox-list"]}>
        <div key={`${fieldname}.any`}>
          {OptionItemController(
            `${fieldname}.any`,
            "Будь-який",
            control,
            (e) => addCheckedValues(`${fieldname}.any`, e.target.checked),
            true
          )}
        </div>

        {options.map((option) => {
          const [key, value] = Object.entries(option)[0];
          const nestedData = Object.entries(option)[1];

          const currentKey = `${fieldname}.${key}`;

          return (
            <div key={currentKey}>
              {OptionItemController(
                currentKey,
                value,
                control,
                (e) => addCheckedValues(currentKey, e.target.checked),
                false
              )}
              {expandedOptions[currentKey] && hasNestedOptions(nestedData) && (
                <div className={style["nested-options"]}>
                  {nestedData[1].map((item) => {
                    const [subKey, subValue] = Object.entries(item)[0];
                    return (
                      <div key={`${currentKey}.${subKey}`}>
                        {OptionItemController(
                          `${currentKey}.${subKey}`,
                          subValue,
                          control,
                          (e) =>
                            addCheckedValues(
                              `${currentKey}.${subKey}`,
                              e.target.checked
                            ),
                          true
                        )}
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

function reducer(state, action) {
  switch (action.type) {
    case "show":
      return { ...state, [action.key]: true };
    case "hide":
      return { ...state, [action.key]: false };
    default:
      return state;
  }
}
