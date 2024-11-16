import { useForm, FormProvider, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { tourFinderSchema } from "../../schemas/tourFinderSchemas";

import OptionGroup from "../optiongroup/component";
import ComboBox from "../comboBox/component";
import DataPicker from "../dataPicker/component";
import FilterableList from "../filterableList/component";
import ComboBoxWithInputs from "../сomboBoxWithInputs/component";
import NumberSelector from "../numberSelector/component";

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
import OptionItem from "../optionItem/component";

export default function TourFinder() {
  const {
    formState: { errors },
    handleSubmit,
    control,
    register,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(tourFinderSchema),
    defaultValues: tourFinderSchema.cast(),
    shouldUnregister: true,
  });

  const onSubmit = (formData) => {
    console.log(formData);
  };
  const watchedValues = useWatch({
    control,
    name: ["destinationCities", "stars", "destinationCountry"],
  });
  const countries = getDestinationCountries();
  const departureCities = getDepartureCities(watchedValues[2]);
  const cities = getDestinationCities(watchedValues[2]);
  let nightsOptions = nights();
  let adultsOptions = adults();
  const selectedCities = valueFiltering(watchedValues[0]);
  const selectedStars = valueFiltering(watchedValues[1]);
  const hotels = getHotels(selectedCities, selectedStars, watchedValues[2]);
  //console.log("Обрані міста:", selectedCities);
  // console.log("Обрані готелі:", hotels);

  return (
    <>
      <FormProvider {...{ register, control, setValue, getValues, errors }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style["form-container"]}>
            <div className={style["form-section"]}>
              <div>
                <ComboBox
                  description="Країна прибуття:"
                  options={countries}
                  fieldname="destinationCountry"
                />
                {errors.destinationCountry && (
                  <p className={style["error-message"]}>
                    {errors.destinationCountry.message}
                  </p>
                )}
              </div>
              <div>
                <ComboBox
                  description="Місто відправлення:"
                  options={departureCities}
                  fieldname="departureCity"
                />
                {errors.departureCity && (
                  <p className={style["error-message"]}>
                    {errors.departureCity.message}
                  </p>
                )}
              </div>
            </div>

            <div className={style["form-section"]}>
              <div>
                <DataPicker
                  fieldname="departureFrom"
                  description="Виліт від:"
                />
                {errors.departureFrom && (
                  <p className={style["error-message"]}>
                    {errors.departureFrom.message}
                  </p>
                )}
              </div>

              <div>
                <DataPicker fieldname="departureTo" description="Виліт до:" />
                {errors.departureTo && (
                  <p className={style["error-message"]}>
                    {errors.departureTo.message}
                  </p>
                )}
              </div>
              <div>
                <ComboBox
                  description="Ночей від:"
                  options={nightsOptions}
                  fieldname="nightsFrom"
                />
                {errors.nightsFrom && (
                  <p className={style["error-message"]}>
                    {errors.nightsFrom.message}
                  </p>
                )}
              </div>
              <div>
                <ComboBox
                  description="Ночей до:"
                  options={nightsOptions}
                  fieldname="nightsTo"
                />
                {errors.nightsTo && (
                  <p className={style["error-message"]}>
                    {errors.nightsTo.message}
                  </p>
                )}
              </div>
              <div>
                <ComboBox
                  description="Дорослих:"
                  options={adultsOptions}
                  fieldname="adults"
                />
                {errors.adults && (
                  <p className={style["error-message"]}>
                    {errors.adults.message}
                  </p>
                )}
              </div>
              <div>
                <ComboBoxWithInputs
                  description="Дітей:"
                  options={kids}
                  fieldname="kids"
                  inputPlaceholder="Вік"
                />
              </div>
              <div>
                <ComboBox
                  description="Валюта:"
                  options={сurrency}
                  fieldname="currency"
                />
                {errors.currency && (
                  <p className={style["error-message"]}>
                    {errors.currency.message}
                  </p>
                )}
              </div>

              <div>
                <div className={style["form-section"]}>
                  <div>
                    <NumberSelector
                      fieldname="priceFrom"
                      description="Ціна від:"
                    />
                    {errors.priceFrom && (
                      <p className={style["error-message"]}>
                        {errors.priceFrom.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <NumberSelector
                      fieldname="priceTo"
                      description="Ціна до:"
                    />
                    {errors.priceTo && (
                      <p className={style["error-message"]}>
                        {errors.priceTo.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
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
            <div className={style["form-section"]}>
              <OptionItem
                name="stopSales"
                value="немає зупинки продажу"
                checked={true}
              />
              <OptionItem name="kidsInOwnBed" value="діти на окремому ліжку" />
            </div>
          </div>
          <button type="submit">Пошук туру</button>
        </form>
      </FormProvider>
    </>
  );
}
