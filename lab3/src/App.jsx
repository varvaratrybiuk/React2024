import OptionGroup from "./components/optiongroup/component";
import ComboBox from "./components/combobox/component";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import {
  getDestinationCities,
  getDepartureCities,
  getDestinationCountries,
  getHotels,
} from "./helpers/locationDataParser";
import FilterableList from "./components/filterableList/components";
import "./App.css";
import { stars, food, kids, nights, adults, сurrency } from "./data/constants";
import DataPicker from "./components/datapicker/componet";
import ComboBoxWithInputs from "./components/сomboBoxWithInputs/component";

function App() {
  const countries = getDestinationCountries();
  const defaultSelectedOption =
    countries && countries.length > 0 ? `${Object.keys(countries[0])[0]}` : "";

  const {
    formState: { errors },
    handleSubmit,
    control,
    register,
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      destinationCities: [],
      stars: [],
      destinationCountry: defaultSelectedOption,
    },
    shouldUnregister: true,
  });
  const onSubmit = (formData) => console.log(formData);
  const watchedValues = useWatch({
    control,
    name: ["destinationCities", "stars", "destinationCountry"],
  });

  const departureCities = getDepartureCities(watchedValues[2]);
  const cities = getDestinationCities(watchedValues[2]);
  let nightsOptions = nights();
  let adultsOptions = adults();
  //Винести
  const valueFiltering = (object, parentKey = "") => {
    // Перевірка, чи є об'єкт валідним (не null і не undefined)
    if (object === null || object === undefined) {
      return [];
    }
  
    return Object.entries(object).flatMap(([key, value]) => {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof value === "boolean" && value) {
        return [[fullKey, value]];
      }
      else if (typeof value === "object") {
        return valueFiltering(value, fullKey);
      }
      return [];
    });
  };
  //console.log(CitiesAndStars[0]);

  const selectedCities = valueFiltering(watchedValues[0]);
  //console.log(selectedCities);
  const selectedStars = valueFiltering(watchedValues[1]);
  const hotels = getHotels(selectedCities, selectedStars, watchedValues[2]);
  //console.log("Обрані міста:", selectedCities);
  // console.log("Обрані готелі:", hotels);
  return (
    <>
      <FormProvider {...{ register, control, setValue, getValues }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="formWrapper">
            <div>
              <ComboBox
                description="Країна прибуття:"
                options={countries}
                fieldname="destinationCountry"
              ></ComboBox>
              <ComboBox
                description="Місто відправлення:"
                options={departureCities}
                fieldname="departureCities"
              ></ComboBox>
            </div>
            <div>
              <DataPicker fieldname="departureFrom" description="Виліт від:" />
              <DataPicker fieldname="departureTo" description="Виліт до:" />
              <ComboBox
                description="Ночей від:"
                options={nightsOptions}
                fieldname="nightsFrom"
              />
              <ComboBox
                description="Ночей до:"
                options={nightsOptions}
                fieldname="nightsTo"
              />
              <ComboBox
                description="Дорослих:"
                options={adultsOptions}
                fieldname="adults"
              ></ComboBox>
              <div>
                <ComboBoxWithInputs
                  description="Дітей:"
                  options={kids}
                  fieldname="kids"
                  inputPlaceholder="Вік"
                />
              </div>
              <ComboBox
                description="Валюта:"
                options={сurrency}
                fieldname="currency"
              ></ComboBox>
            </div>
            <div>
              <OptionGroup
                description="Місто:"
                options={cities}
                fieldname="destinationCities"
              />
              <OptionGroup
                description="Зірки:"
                options={stars}
                fieldname="stars"
              />
              <FilterableList
                description="Готель:"
                fieldname="hotels"
                options={hotels}
              />
              <OptionGroup
                description="Харчування:"
                options={food}
                fieldname="food"
              />
            </div>
          </div>
          <button type="submit">Пошук туру</button>
        </form>
      </FormProvider>
    </>
  );
}

export default App;
