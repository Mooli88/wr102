const URL = "https://api.openweathermap.org/data/2.5/weather";

const parseUrlParams = (params) => {
  const usp = new URLSearchParams({
    ...params,
    appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
  });

  return decodeURI(usp);
};

export const getWeatherById = async (id, units = "metric") => {
  try {
    const res = await fetch(`${URL}?${parseUrlParams({ id, units })}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getWeatherByCityName = async ({
  city,
  country = "UK",
  units = "metric",
}) => {
  try {
    const res = await fetch(
      `${URL}?${parseUrlParams({ q: [city, country], units })}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default {
  getWeatherById,
  getWeatherByCityName,
};
