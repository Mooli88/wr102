import React from "react";
import PropTypes from "prop-types";
import Loading from "../Loading/Loading";
import useCpuInfo from "../../hooks/useCpuInfo";
import styles from "./ComponentTemp.module.css";

const { root, temp } = styles;

export const TYPE = {
  CPU: "cpu",
};

const COMPONENT_ICON = {
  [TYPE.CPU]:
    "https://img.icons8.com/material-outlined/64/000000/smartphone-cpu.png",
};

const ComponentTemperature = ({ type = TYPE.CPU }) => {
  const { cpuTemp, convertUnits } = useCpuInfo({ observeCpuTemp: true });
  return (
    <div className={root}>
      <img src={COMPONENT_ICON[type]} alt={type} />
      {cpuTemp?.main ? (
        <span className={`${temp} text-bg-color--primary`}>
          {convertUnits(cpuTemp.main)}°
        </span>
      ) : (
        <Loading />
      )}
      <img
        src="https://img.icons8.com/cotton/64/000000/thermometer--v3.png"
        alt="thermometer"
      />
    </div>
  );
};

ComponentTemperature.propTypes = {
  type: PropTypes.oneOf(Object.values(TYPE)),
};

export default ComponentTemperature;
