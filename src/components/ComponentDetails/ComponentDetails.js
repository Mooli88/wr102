import React, { useState } from "react";
import chevronUpIcon from "../../icons/chevron-up-icon.svg";
import useCpuInfo from "../../hooks/useCpuInfo";
import styles from "./ComponentDetails.module.css";

const { root, btn, icon, details, expand, hidden } = styles;
const ComponentDetails = (props) => {
  const [isOpenState, setIsOpenState] = useState();
  const { cpuState, cpuTemp, convertUnits } = useCpuInfo({
    observeCpuInfo: true,
    observeCpuTemp: true,
  });
  const toggle = () => setIsOpenState((state) => !state);
  const isLoading = !(cpuState.brand && cpuTemp.max);
  const { brand, manufacturer } = cpuState;
  const { chipset, cores, max } = cpuTemp;

  return (
    <div className={`${root} ${isOpenState ? expand : ""}`}>
      <button className={`${btn} ${isLoading ? hidden : ""}`} onClick={toggle}>
        <img className={icon} src={chevronUpIcon} alt="chevron" />
      </button>
      <div className={details}>
        <ul>
          <li>
            <h4>Brand</h4>
            <span>
              {manufacturer} {brand}
            </span>
          </li>
          {chipset ? (
            <li>
              <h4>Chipset</h4>
              <span>{chipset}</span>
            </li>
          ) : null}
          <li>
            <h4>Max</h4>
            <span>{convertUnits(max)}°</span>
          </li>
          {cores?.map((core, i) => (
            <li key={core + i}>
              <h4>Core {i + 1}</h4>
              <span>{convertUnits(core)}°</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ComponentDetails;
