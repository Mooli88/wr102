import React, { useEffect } from "react";
import useWeather from "../../hooks/useWeather";
import Loading from "../Loading/Loading";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./WeatherDisplay.module.css";

const { root, weatherTemp, weatherTempVal, weatherCondition } = styles;

const WeatherDisplay = () => {
  const { weatherState, getWeatherByCityName, loadingState } = useWeather();
  const { weather, temp } = weatherState;

  useEffect(() => {
    getWeatherByCityName({ city: "swindon" });
  }, [getWeatherByCityName]);

  return (
    <div className={root}>
      {loadingState ? (
        <Loading />
      ) : (
        <div className={weatherTemp}>
          <div className={weatherCondition}>
            <img src={weather.icon} alt={weather.main} title={weather.main} />
          </div>
          <div className={`${weatherTempVal} text-bg-color--primary`}>
            {temp}°
          </div>
        </div>
      )}
      <SearchBar
        defaultValue="London"
        onSubmit={(val) => getWeatherByCityName({ city: val })}
      />
    </div>
  );
};

export default WeatherDisplay;
