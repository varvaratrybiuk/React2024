import data from "../data/destinations_and_hotels.json";

// Отримання міст для подорожування
export const getDestinationCities = (countryName) => {
  return data.flatMap((item) => {
    if (item.destinationCountry && item.destinationCountry[countryName]) {
      if (item.destinationCities) {
        return item.destinationCities.flatMap((city) => {
          const cityName = Object.keys(city)[0];
          const cityValue = Object.values(city)[0];
          if (city.resorts) {
            return {
              [cityName]: cityValue,
              resorts: city.resorts.map((resort) => {
                const resortName = Object.keys(resort)[0];
                const resortValue = Object.values(resort)[0];
                return { [resortName]: resortValue };
              }),
            };
          } else {
            return { [cityName]: cityValue };
          }
        });
      }
    }
    return [];
  });
};
// Отримання готелів за місцем та зірками
export const getHotels = (places, stars, countryName) => {
  const starsName = stars.map(([name]) => name);
  const placeNames = places
    .map(([name]) => name)
    .filter((name) => name !== "any");

  if (placeNames.length === 0) {
    return getAllHotels(starsName, countryName);
  }

  return getHotelsByName(placeNames, starsName);
};

const addHotel = (hotelObj, hotels, starsName) => {
  if (
    starsName.includes(hotelObj.stars) ||
    starsName.includes("any") ||
    starsName.length === 0
  ) {
    const hotelName = Object.keys(hotelObj)[0];
    const hotelUkrName = hotelObj[hotelName];
    const stars = hotelObj.stars;
    hotels.push({ [hotelName]: `${hotelUkrName} ${stars}` });
  }
};

const getAllHotels = (starsName, countryName) => {
  return data.flatMap((item) => {
    const hotels = [];

    if (item.destinationCountry && item.destinationCountry[countryName]) {
      item.destinationCities.forEach((city) => {
        if (city.hotels) {
          city.hotels.forEach((hotelObj) =>
            addHotel(hotelObj, hotels, starsName)
          );
        }
        if (city.resorts) {
          city.resorts.forEach((resort) => {
            if (resort.hotels) {
              resort.hotels.forEach((hotelObj) =>
                addHotel(hotelObj, hotels, starsName)
              );
            }
          });
        }
      });
    }

    return hotels;
  });
};

const getHotelsByName = (placeNames, starsName) => {
  return placeNames.flatMap((place) => {
    return data.flatMap((item) => {
      const hotels = [];
      const [firstPart, ...secondParts] = place.split(".");
      const secondPart = secondParts.join(".");

      item.destinationCities.forEach((city) => {
        if (city[place] && city.hotels) {
          city.hotels.forEach((hotelObj) =>
            addHotel(hotelObj, hotels, starsName)
          );
        } else if (city[firstPart] && city.resorts) {
          city.resorts.forEach((resort) => {
            if (!secondPart) {
              resort.hotels.forEach((hotelObj) =>
                addHotel(hotelObj, hotels, starsName)
              );
            } else if (resort[secondPart] && resort.hotels) {
              resort.hotels.forEach((hotelObj) =>
                addHotel(hotelObj, hotels, starsName)
              );
            }
          });
        }
      });

      return hotels;
    });
  });
};
// Отримання країн куди можна поїхати
export const getDestinationCountries = () => {
  return data.flatMap((item) => {
    const countryName = Object.keys(item.destinationCountry)[0];
    const countryValue = Object.values(item.destinationCountry)[0];
    return countryName && countryValue ? [{ [countryName]: countryValue }] : [];
  });
};

export const getDepartureCities = (countryName) => {
  return data.flatMap((item) => {
    if (
      item.destinationCountry &&
      item.destinationCountry[countryName] &&
      Array.isArray(item.departureCities)
    ) {
      return item.departureCities.flatMap((city) => {
        const cityName = Object.keys(city)[0];
        const cityValue = Object.values(city)[0];
        return cityName && cityValue ? [{ [cityName]: cityValue }] : [];
      });
    }
    return [];
  });
};
