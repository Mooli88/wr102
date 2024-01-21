import { useEffect, useState } from "react";
import { useSettingCtx, UNITS } from "../contexts/settingsContext";

import PropTypes from "prop-types";

const useCpuInfo = ({ observeCpuTemp, observeCpuInfo }) => {
  const [cpuState, setCpuState] = useState({});
  const [cpuTemp, setCpuTemp] = useState({});
  const { units } = useSettingCtx();
  const { electron } = window;

  // Convert to Celsius or Fahrenheit
  const convertUnits = (value) =>
    (units === UNITS.METRIC ? value : (value * 9) / 5 + 32)?.toFixed(1);

  useEffect(() => {
    electron.getCpuTemp((temperature) => {
      if (observeCpuTemp) setCpuTemp(temperature);
    });
  }, [observeCpuTemp, electron]);

  useEffect(() => {
    electron.getCpuInfo((info) => {
      if (observeCpuInfo) setCpuState(info);
    });
  }, [observeCpuInfo, electron]);

  return {
    cpuTemp,
    cpuState,
    convertUnits,
  };
};

useCpuInfo.propTypes = {
  config: PropTypes.shape({
    observeCpuInfo: PropTypes.bool,
    observeCpuTemp: PropTypes.bool,
  }),
};

export default useCpuInfo;
