import data from "../data/destinations_and_hotels.json";

export const getCities = () => {
  return data.flatMap((item) =>
    item.destinationCities.flatMap((city) => {
      const cityName = Object.keys(city)[0];
      const cityValue = Object.values(city)[0];

      if (city.resorts) {
        return {
          [cityName]: cityValue,
          resorts: city.resorts.map((resort) => ({
            [Object.keys(resort)[0]]: Object.values(resort)[0],
          })),
        };
      } else {
        return { [cityName]: cityValue };
      }
    })
  );
};
export const getHotels = (places, stars) => {
  const starsName = stars.map(([name]) => name);
  const placeNames = places
    .map(([name]) => name)
    .filter((name) => name !== "any");

  if (placeNames.length === 0) {
    return getAllHotels(starsName);
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

const getAllHotels = (starsName) => {
  return data.flatMap((item) => {
    const hotels = [];
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
