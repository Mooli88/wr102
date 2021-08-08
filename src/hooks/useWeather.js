import { useEffect, useState } from "react";
import { useSettingCtx } from "../contexts/settingsContext";
import api from "../services/openWeatherApi";

const INIT_WEATHER_STATE = {
  id: null,
  name: "",
  temp: "N/A",
  weather: {},
};

const ONE_MIN = 1000 * 60;

const useWeather = () => {
  const [weatherState, setWeatherState] = useState(INIT_WEATHER_STATE);
  const [loadingState, setLoadingState] = useState(false);
  const { units } = useSettingCtx();

  useEffect(() => {
    const { id } = weatherState;
    if (id) {
      getWeatherData(() => api.getWeatherById(id, units));
    }
  }, [units]);

  // Periodically fetch weather
  useEffect(() => {
    const { id } = weatherState;

    if (!id) return;

    const timeoutId = setTimeout(() => {
      getWeatherData(() => api.getWeatherById(id, units));
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
      units,
    });
    getWeatherData(() => promise);
  };

  return {
    weatherState,
    loadingState,
    getWeatherByCityName,
  };
};

export default useWeather;
