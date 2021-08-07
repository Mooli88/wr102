const URL = "https://api.openweathermap.org/data/2.5/weather";
const ICON_URL = "http://openweathermap.org/img/wn";
const ICONS8_URL = "https://img.icons8.com/ios/50";
const WEATHER_ICON_NAME = {
  "01": "sun--v1",
  "02": "partly-cloudy-day--v1",
  "03": "clouds",
  "04": "clouds",
  "09": "rain--v1",
  10: "rain--v1",
  11: "storm",
  13: "snow--v1",
};

const getIconImg = (iconId) => {
  const normaliseIconId = iconId.replace(/\D/g, "");
  const iconName = WEATHER_ICON_NAME[normaliseIconId];
  return (
    (iconName ? `${ICONS8_URL}/${iconName}` : `${ICON_URL}/${iconId}@2x`) +
    ".png"
  );
};

const parseUrlParams = (params) => {
  const usp = new URLSearchParams({
    ...params,
    appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
  });

  return decodeURI(usp);
};

const checkForError = ({ cod, message }) => {
  if (cod !== 200) {
    throw new Error(message);
  }
};

export const getWeatherById = async (id, units = "metric") => {
  try {
    const res = await fetch(`${URL}?${parseUrlParams({ id, units })}`);
    const data = await res.json();
    const [weather] = data.weather;
    return {
      ...data,
      weather: {
        ...weather,
        icon: getIconImg(weather.icon),
      },
    };
  } catch (error) {
    console.error(error);
  }
};

export const getWeatherByCityName = async ({
  city,
  country = "UK",
  units = "metric",
}) => {
  const res = await fetch(
    `${URL}?${parseUrlParams({ q: [city, country], units })}`
  );
  const data = await res.json();
  console.log("data", data);
  checkForError(data);

  const [weather] = data.weather;
  return {
    ...data,
    weather: {
      ...weather,
      icon: getIconImg(weather.icon),
    },
  };
};

export default {
  getWeatherById,
  getWeatherByCityName,
};
