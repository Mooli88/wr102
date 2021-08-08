import React, { useState } from "react";
import chevronUpIcon from "../../icons/chevron-up-icon.svg";
import useCpuInfo from "../../hooks/useCpuInfo";
import styles from "./ComponentDetails.module.css";

const { root, btn, icon, details, visible } = styles;
const ComponentDetails = (props) => {
  const [isOpenState, setIsOpenState] = useState();
  const { cpuState, cpuTemp } = useCpuInfo({
    observeCpuInfo: true,
    observeCpuTemp: true,
  });
  const toggle = () => setIsOpenState((state) => !state);
  const { brand, manufacturer } = cpuState;
  const { chipset, cores, max } = cpuTemp;
  return (
    <div className={`${root} ${isOpenState && visible}`}>
      <button className={btn} onClick={toggle}>
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
            <span>{max}°</span>
          </li>
          {cores?.map((core, i) => (
            <li key={core + i}>
              <h4>Core {i + 1}</h4>
              <span>{core}°</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ComponentDetails;
