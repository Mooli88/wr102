import { useEffect, useState } from "react";
import openWeatherApi, { getWeatherById } from "../services/openWeatherApi";

const UNITS = {
  METRIC: "metric",
  IMPERIAL: "imperial",
};

const DEFAULT_WEATHER_STATE = {
  id: null,
  name: "",
  temp: "",
  weather: {},
};

const useWeather = () => {
  const [weatherState, setWeatherState] = useState(DEFAULT_WEATHER_STATE);
  const [unitsState, setUnitsState] = useState(UNITS.METRIC);

  useEffect(() => {
    const { id } = weatherState;
    if (id) getWeatherById(id, unitsState).then(setWeather);
  }, [unitsState]);

  const setWeather = ({ id, name, weather, main: { temp } }) =>
    setWeatherState({
      id,
      name,
      temp,
      weather: weather[0],
    });

  const changeUnits = () => {
    const { METRIC, IMPERIAL } = UNITS;
    setUnitsState((units) => (units === METRIC ? IMPERIAL : METRIC));
  };

  const getWeatherByCityName = async (options) => {
    const data = await openWeatherApi.getWeatherByCityName({
      ...options,
      units: unitsState,
    });
    setWeather(data);
  };

  return {
    weatherState,
    changeUnits,
    getWeatherByCityName,
  };
};

export default useWeather;
