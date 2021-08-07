import { useEffect, useState } from "react";
import api from "../services/openWeatherApi";

export const UNITS = {
  METRIC: "metric",
  IMPERIAL: "imperial",
};

const INIT_WEATHER_STATE = {
  id: null,
  name: "",
  temp: "N/A",
  weather: {},
};

const ONE_MIN = 1000 * 60;

const useWeather = () => {
  const [weatherState, setWeatherState] = useState(INIT_WEATHER_STATE);
  const [unitsState, setUnitsState] = useState(UNITS.METRIC);
  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    const { id } = weatherState;
    if (id) {
      getWeatherData(() => api.getWeatherById(id, unitsState));
    }
  }, [unitsState]);

  // Periodically fetch weather
  useEffect(() => {
    const { id } = weatherState;

    if (!id) return;

    const timeoutId = setTimeout(() => {
      getWeatherData(() => api.getWeatherById(id, unitsState));
    }, ONE_MIN * 60);

    return () => clearTimeout(timeoutId);
  }, [weatherState]);

  const setWeather = ({ id, name, weather, main: { temp } }) =>
    setWeatherState({
      id,
      name,
      temp,
      weather,
    });

  const changeUnits = () => {
    const { METRIC, IMPERIAL } = UNITS;
    setUnitsState((units) => (units === METRIC ? IMPERIAL : METRIC));
  };

  const getWeatherData = async (cb) => {
    try {
      setLoadingState(true);
      const data = await cb();
      setWeather(data);
    } catch (error) {
      setWeatherState(INIT_WEATHER_STATE);
      alert(error);
    }
    setLoadingState(false);
  };

  const getWeatherByCityName = (options) => {
    const promise = api.getWeatherByCityName({
      ...options,
      units: unitsState,
    });
    getWeatherData(() => promise);
  };

  return {
    weatherState,
    unitsState,
    loadingState,
    changeUnits,
    getWeatherByCityName,
  };
};

export default useWeather;
