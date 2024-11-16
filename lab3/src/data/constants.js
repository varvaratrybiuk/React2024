export const stars = [
  { "1*": "1*" },
  { "2*": "2*" },
  { "3*": "3*" },
  { "4*": "4*" },
  { "5*": "5*" },
];

export const food = [
  { "all inclusive": "все включено" },
  { breakfast: "сніданок" },
  { fullBoard: "сніданок, обід, вечеря" },
  { "breakfast and dinner": "сніданок та вечеря" },
  { "without food": "без харчування" },
];

export const nights = () => {
  const result = [];
  for (let i = 6; i <= 32; i++) {
    result.push({ [`${i} nights`]: `${i}` });
  }
  return result;
};

export const adults = () => {
  const result = [];
  for (let i = 1; i <= 9; i++) {
    result.push({ [`${i} adults`]: `${i}` });
  }
  return result;
};

export const kids = [{ "0 kids": "0" }, { "1 kids": "1" }, { "2 kids": "2" }, { "3 kids": "3" }];
export const сurrency = [{"UAH": "UAH"}]