import React from "react";
import PropTypes from "prop-types";
import { useSettingCtx, UNITS } from "../../contexts/settingsContext";
import styles from "./Units.module.css";

const { root, active } = styles;

const Units = (props) => {
  const { units, changeUnits } = useSettingCtx();

  const isMetricUnits = units === UNITS.METRIC;

  return (
    <div className={root} onClick={changeUnits}>
      <span className={isMetricUnits && active}>C</span>
      <span>/</span>
      <span className={!isMetricUnits && active}>F</span>°
    </div>
  );
};

export default Units;
