import React from "react";
import WeatherDisplay from "../WeatherDisplay/WeatherDisplay";
import ComponentTemp from "../ComponentTemp/ComponentTemp";
import ComponentDetails from "../ComponentDetails/ComponentDetails";
import styles from "./Dashboard.module.css";

const { root, topSection, mainSection } = styles;

const Dashboard = () => {
  return (
    <div className={root}>
      <div className={topSection}>
        <WeatherDisplay />
      </div>
      <div className={mainSection}>
        <ComponentTemp />
      </div>
      <ComponentDetails />
    </div>
  );
};

export default Dashboard;
