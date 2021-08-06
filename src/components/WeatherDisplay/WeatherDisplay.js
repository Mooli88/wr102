import React, { useEffect } from "react";
import PropTypes from "prop-types";
import useWeather from "../../hooks/useWeather";

const WeatherDisplay = (props) => {
  const { weatherState, getWeatherByCityName, changeUnits } = useWeather();
  console.log(weatherState);

  useEffect(() => {
    getWeatherByCityName({ city: "swindon" });
  }, []);

  return <div>{weatherState.temp} c</div>;
};

WeatherDisplay.propTypes = {};

export default WeatherDisplay;
