import React, { useEffect } from "react";
import PropTypes from "prop-types";
import useWeather, { UNITS } from "../../hooks/useWeather";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./WeatherDisplay.module.css";
import Loading from "../Loading/Loading";

const { root, weatherTemp, weatherTempVal, weatherCondition } = styles;

const WeatherDisplay = (props) => {
  const { weatherState, getWeatherByCityName, changeUnits, loadingState } =
    useWeather();
  const { weather, temp } = weatherState;

  useEffect(() => {
    getWeatherByCityName({ city: "swindon" });
  }, []);

  return (
    <div className={root}>
      {loadingState ? (
        <Loading />
      ) : (
        <div className={weatherTemp}>
          <div className={weatherCondition}>
            <img src={weather.icon} />
          </div>
          <div className={`${weatherTempVal} text-bg-color--primary`}>
            {temp.toFixed(1)}°
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

WeatherDisplay.propTypes = {};

export default WeatherDisplay;
