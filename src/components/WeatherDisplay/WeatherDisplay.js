import React, { useEffect } from "react";
import PropTypes from "prop-types";
import useWeather, { UNITS } from "../../hooks/useWeather";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./WeatherDisplay.module.css";

const WeatherDisplay = (props) => {
  const {
    weatherState,
    unitsState,
    getWeatherByCityName,
    changeUnits,
    loadingState,
  } = useWeather();
  const units = unitsState === UNITS.METRIC ? "C" : "F";
  const isMetricUnits = unitsState === UNITS.METRIC;
  const { weather, temp } = weatherState;

  useEffect(() => {
    getWeatherByCityName({ city: "swindon" });
  }, []);

  return (
    <div>
      {loadingState ? (
        "Loading..."
      ) : (
        <div>
          <div>
            <img src={weather.icon} />
          </div>
          <div>{weatherState.temp}&#186;</div>
        </div>
      )}
      <div onClick={() => changeUnits()}>
        <span className={isMetricUnits && "active"}>C</span>
        <span>/</span>
        <span className={!isMetricUnits && "active"}>F</span>
      </div>
      <SearchBar
        defaultValue="London"
        onSubmit={(val) => getWeatherByCityName({ city: val })}
      />
    </div>
  );
};

WeatherDisplay.propTypes = {};

export default WeatherDisplay;
