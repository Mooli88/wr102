import { useEffect, useState, useCallback, useRef } from "react";
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
  const prevUnits = useRef(units);
  const { id } = weatherState;
  const setWeather = ({
    id,
    name,
    weather,
    main: { temp },
    sys: { country },
  }) =>
    setWeatherState({
      id,
      name,
      country,
      temp: temp.toFixed(1),
      weather,
    });

  const getWeatherData = useCallback(async (cb) => {
    try {
      setLoadingState(true);
      const data = await cb();
      setWeather(data);
    } catch (error) {
      setWeatherState(INIT_WEATHER_STATE);
      alert(error);
    }
    setLoadingState(false);
  }, []);

  const getWeatherByCityName = useCallback(
    (options) => {
      const promise = api.getWeatherByCityName({
        ...options,
        units,
      });
      getWeatherData(() => promise);
    },
    [units, getWeatherData]
  );

  useEffect(() => {
    if (!id || prevUnits.current === units) return;
    // Get weather with new units
    getWeatherData(() => api.getWeatherById(id, units));

    // Periodically fetch weather
    const timeoutId = setTimeout(() => {
      getWeatherData(() => api.getWeatherById(id, units));
    }, ONE_MIN * 60);

    prevUnits.current = units;

    return () => clearTimeout(timeoutId);
  }, [id, units, getWeatherData]);

  return {
    weatherState,
    loadingState,
    getWeatherByCityName,
  };
};

export default useWeather;
