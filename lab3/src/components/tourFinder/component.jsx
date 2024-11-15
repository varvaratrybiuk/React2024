import { useForm, FormProvider, useWatch } from "react-hook-form";
import OptionGroup from "../optiongroup/component";
import ComboBox from "../comboBox/component";
import DataPicker from "../dataPicker/component";
import FilterableList from "../filterableList/component";
import ComboBoxWithInputs from "../сomboBoxWithInputs/component";
import {
  getDestinationCities,
  getDepartureCities,
  getDestinationCountries,
  getHotels,
} from "../../helpers/locationDataParser";
import {
  stars,
  food,
  kids,
  nights,
  adults,
  сurrency,
} from "../../data/constants";
import { valueFiltering } from "../../helpers/filterFunctions";
import style from "./style.module.css";

export default function TourFinder() {
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
          <div className={style["form-container"]}>
            <div className={style["form-section"]}>
              <ComboBox
                description="Країна прибуття:"
                options={countries}
                fieldname="destinationCountry"
              />
              <ComboBox
                description="Місто відправлення:"
                options={departureCities}
                fieldname="departureCities"
              />
            </div>

            <div className={style["form-section"]}>
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
              />
              <ComboBoxWithInputs
                description="Дітей:"
                options={kids}
                fieldname="kids"
                inputPlaceholder="Вік"
              />
              <ComboBox
                description="Валюта:"
                options={сurrency}
                fieldname="currency"
              />
            </div>
            <div className={style["form-section"]}>
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
