import React from "react";
import Units from "../Units/Units";
import menuIcon from "../../icons/menu-icon.svg";
import styles from "./Menu.module.css";

const { root, menu } = styles;

const Menu = () => {
  return (
    <div className={root}>
      <Units />
      <div className={menu}>
        <img src={menuIcon} height="32px" alt="menu-btn" />
      </div>
    </div>
  );
};

export default Menu;
