import React, { useState } from "react";
import PropTypes from "prop-types";
import chevronUpIcon from "../../icons/chevron-up-icon.svg";
import useCpuInfo from "../../hooks/useCpuInfo";
import styles from "./ComponentDetails.module.css";

const { root, btn, icon, details, visible } = styles;
// chipset,: null;
// cores,: (2)[(27.8, 29.8)];
// main,: 28.8;
// max,: 29.8;
const ComponentDetails = (props) => {
  const [isOpenState, setIsOpenState] = useState();
  const { cpuState, cpuTemp } = useCpuInfo({
    observeCpuInfo: true,
    observeCpuTemp: true,
  });
  console.log("cpuTemp ", cpuTemp);
  console.log("cpuState ", cpuState);

  const toggle = () => setIsOpenState((state) => !state);
  const { brand, manufacturer } = cpuState;
  const { chipset, cores, max } = cpuTemp;
  return (
    <div className={`${root} ${isOpenState && visible}`}>
      <button className={btn} onClick={toggle}>
        <img
          className={icon}
          src={chevronUpIcon}
          alt="chevron"
          //   style={{ transform: `rotate(${isOpenState ? "180deg" : "0"})` }}
        />
        {/* <img src="https://img.icons8.com/material/30/000000/chevron-up--v1.png" /> */}
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
            <li>
              <h4>Core {i + 1}</h4>
              <span>{core}°</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

ComponentDetails.propTypes = {};

export default ComponentDetails;
