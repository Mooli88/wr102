import React from "react";
import PropTypes from "prop-types";
import useCpuInfo from "../../hooks/useCpuInfo";

const ComponentTemperature = (props) => {
  const { cpuTemp } = useCpuInfo({ observeCpuTemp: true });
  return <div>{cpuTemp}c</div>;
};

ComponentTemperature.propTypes = {};

export default ComponentTemperature;
