import * as yup from "yup";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

export const tourFinderSchema = yup
  .object()
  .shape({
    destinationCountry: yup
      .string()
      .default("Виберіть країну прибуття")
      .required("Оберіть країну прибуття")
      .test("not-default", "Виберіть країну прибуття", (value) => {
        return value !== "Виберіть країну прибуття";
      }),

    departureCity: yup
      .string()
      .default("Виберіть місто відправлення")
      .required("Оберіть хоча б одне місто відправлення")
      .test("not-default", "Виберіть місто відправлення", (value) => {
        return value !== "Виберіть місто відправлення";
      }),

    departureFrom: yup
      .object()
      .default(() => dayjs())
      .required("Оберіть дату вильоту від"),
    departureTo: yup
      .object()
      .required("Оберіть дату вильоту до")
      .default(() => dayjs().add(6, "days"))
      .test(
        "departureTo-minimum-date",
        "Дата вильоту до повинна бути через 6 днів після дати вильоту від",
        function (value) {
          const { departureFrom } = this.parent;
          dayjs.extend(isSameOrAfter);
          return dayjs(value).isSameOrAfter(
            dayjs(departureFrom).add(6, "days")
          );
        }
      ),
    nightsFrom: yup
      .string()
      .default("6 nights")
      .required("Оберіть кількість ночей від"),

    nightsTo: yup
      .string()
      .default("14 nights")
      .required("Оберіть кількість ночей до")
      .test(
        "is-greater-than-nightsFrom",
        "Кількість ночей до повинна бути більшою за кількість ночей від",
        function (value) {
          const { nightsFrom } = this.parent;
          const nightsFromNum = parseInt(nightsFrom, 10);
          const nightsToNum = parseInt(value, 10);
          return nightsToNum > nightsFromNum;
        }
      ),

    adults: yup
      .string()
      .default("4 adults")
      .required("Оберіть кількість дорослих"),

    kids: yup.object().shape({
      comboBox: yup.string().default("0 kids").required("Оберіть к-сть дітей"),
      inputs: yup.array().of(
        yup.object().shape({
          value: yup
            .number()
            .typeError("Вік дитини має бути числом")
            .min(0, "Вік не може бути від'ємним")
            .max(17, "Максимальний вік дитини 17 років")
            .required("Вік дитини є обов'язковим"),
        })
      ),
    }),

    currency: yup.string().default("UAH").required("Оберіть валюту"),

    priceFrom: yup
      .number()
      .default(0)
      .typeError("Ціна має бути числом")
      .min(0, "Мінімальна ціна 0"),

    priceTo: yup
      .number()
      .typeError("Ціна має бути числом")
      .min(yup.ref("priceFrom"), "Максимальна ціна має бути більшою"),
  })
  .required();