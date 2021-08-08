import React from "react";
import PropTypes from "prop-types";
import { useSettingCtx } from "../../contexts/settingsContext";
import Units from "../Units/Units";
import menuIcon from "../../icons/menu-icon.svg";
import styles from "./Menu.module.css";

const { root, menu } = styles;

const Menu = (props) => {
  const { units } = useSettingCtx();

  return (
    <div className={root}>
      <Units />
      <div className={menu}>
        <img src={menuIcon} height="32px" alt="menu-btn" />
      </div>
    </div>
  );
};

Menu.propTypes = {};

export default Menu;
