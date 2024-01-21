import React, { createContext, useContext, useState } from "react";

export const UNITS = {
  METRIC: "metric",
  IMPERIAL: "imperial",
};

const SettingsContext = createContext(UNITS.METRIC);

const SettingsProvider = ({ children }) => {
  const [unitsState, setUnitsState] = useState(UNITS.METRIC);

  const changeUnits = () => {
    const { METRIC, IMPERIAL } = UNITS;
    setUnitsState((units) => (units === METRIC ? IMPERIAL : METRIC));
  };

  return (
    <SettingsContext.Provider
      value={{
        units: unitsState,
        changeUnits,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

const useSettingCtx = () => {
  const settingsCtx = useContext(SettingsContext);
  if (settingsCtx === null) {
    throw new Error("useSettingCtx() called outside of a SettingsProvider");
  }
  return settingsCtx;
};

export { SettingsProvider, useSettingCtx };
