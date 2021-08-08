import { useEffect } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import { SettingsProvider } from "./contexts/settingsContext";
import Menu from "./components/Menu/Menu";

function App() {
  useEffect(() => {
    window.electron.isAdmin().then((res) => console.log("isAdmin", res));
  }, []);

  return (
    <div className="App">
      <SettingsProvider>
        <Menu />
        <Dashboard />
      </SettingsProvider>
    </div>
  );
}

export default App;
