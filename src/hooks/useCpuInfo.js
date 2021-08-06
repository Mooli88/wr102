import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const { electron } = window;

const useCpuInfo = ({ observeCpuTemp, observeCpuInfo }) => {
  const [cpuState, setCpuState] = useState();
  const [cpuTemp, setCpuTemp] = useState();

  useEffect(() => {
    electron.getCpuTemp((temperature) => {
      if (observeCpuTemp) setCpuTemp(temperature);
    });
  }, [observeCpuTemp]);

  useEffect(() => {
    electron.getCpuInfo((info) => {
      if (observeCpuInfo) setCpuState(info);
    });
  }, [observeCpuTemp]);

  return {
    cpuTemp,
    cpuState,
  };
};

useCpuInfo.propTypes = {
  config: PropTypes.shape({
    observeCpuInfo: PropTypes.bool,
    observeCpuTemp: PropTypes.bool,
  }),
};

export default useCpuInfo;
