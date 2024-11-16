import React from "react";
import OptionGroup from "../optionGroup/OptionGroup";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import style from "./FilterableListStyle.module.css";

export default function FilterableList(props) {
  const { description, options, fieldname } = props;
  const [searchText, setSearchText] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const { getValues } = useFormContext();

  const getFavoriteOptions = () => {
    const fieldValues = getValues(fieldname);

    if (fieldValues) {
      return (
        Object.entries(options)
          .filter(([key, value]) => {
            const optionKey = Object.keys(value)[0];
            return fieldValues[optionKey] === true;
          })
          .map(([key, value]) => value) || []
      );
    }
    return [];
  };

  const getFilteredOptions = (text, optionsList) => {
    return Object.entries(optionsList)
      .filter(([key, value]) => {
        const firstKey = Object.keys(value)[0];
        const firstValue = Object.values(value)[0];
        return (
          (typeof firstKey === "string" &&
            firstKey.toLowerCase().includes(text.toLowerCase())) ||
          (typeof firstValue === "string" &&
            firstValue.toLowerCase().includes(text.toLowerCase()))
        );
      })
      .map(([key, value]) => value);
  };

  const optionsToDisplay = getFilteredOptions(
    searchText,
    showFavorites ? getFavoriteOptions() : options
  );

  return (
    <div className={style["wrapper"]}>
      <div className={style["search-container"]}>
        <div>
          <label htmlFor="searchText" className={style.label}>
            Пошук:
          </label>
          <input
            type="text"
            id="searchText"
            placeholder="Введіть текст для пошуку"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className={style["searchInput"]}
          />
        </div>

        <div className={style["checkbox-container"]}>
          <input
            id="showFavorites"
            type="checkbox"
            checked={showFavorites}
            onChange={(e) => setShowFavorites(e.target.checked)}
          />
          <label htmlFor="showFavorites">Обрані</label>
        </div>
      </div>

      <OptionGroup
        description={description}
        fieldname={fieldname}
        options={optionsToDisplay}
      />
    </div>
  );
}
