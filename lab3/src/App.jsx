import { useState, useEffect } from "react";
import OptionGroup from "./components/optiongroup/component";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { getCities, getHotels } from "./helpers/locationDataParser";

const stars = [
  { "1*": "1*" },
  { "2*": "2*" },
  { "3*": "3*" },
  { "4*": "4*" },
  { "5*": "5*" },
];
const food = [
  { "all inclusive": "все включено" },
  { breakfast: "сніданок" },
  { fullBoard: "сніданок, обід, вечеря" },
  { "breakfast and dinner": "сніданок та вечеря" },
  { "without food": "без харчування" },
];
function App() {
  const {
    formState: { errors },
    handleSubmit,
    control,
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      cities: [],
      stars: [],
    },
  });
  const cities = getCities();

  const onSubmit = (formData) => console.log(formData);
  const CitiesAndStars = useWatch({
    control,
    name: ["cities", "stars"],
  });
  const valueFiltering = (object) => {
    return Object.entries(object).flatMap(([key, isSelected]) => {
      if (typeof isSelected === "boolean" && isSelected) {
        return [[key, isSelected]];
      } else if (typeof isSelected === "object") {
        return Object.entries(isSelected)
          .filter(([subCity, isSelected]) => isSelected)
          .map(([subCity]) => [`${key}.${subCity}`, true]);
      }
      return [];
    });
  };
  //console.log(CitiesAndStars[0]);

  const selectedCities = valueFiltering(CitiesAndStars[0]);
  //console.log(selectedCities);
  const selectedStars = valueFiltering(CitiesAndStars[1]);
  const hotels = getHotels(selectedCities, selectedStars);
  //console.log("Обрані міста:", selectedCities);
  console.log("Обрані готелі:", hotels);
  return (
    <>
      <FormProvider {...{ control, setValue, getValues }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <OptionGroup
            description="Місто:"
            options={cities}
            fieldname="cities"
          ></OptionGroup>
          <OptionGroup
            description="Зірки:"
            options={stars}
            fieldname="stars"
          ></OptionGroup>
          <OptionGroup
            description="Готель:"
            fieldname="hotels"
            options={hotels}
          ></OptionGroup>
          <OptionGroup
            description="Харчування:"
            options={food}
            fieldname="food"
          ></OptionGroup>
          <button type="submit">Submit</button>
        </form>
      </FormProvider>
    </>
  );
}

export default App;
