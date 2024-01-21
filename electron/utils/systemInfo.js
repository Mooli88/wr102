const si = require("systeminformation");

const randomCpuTemp = (min, max) =>
  +(Math.random() * (max - min) + min).toFixed(1);

const mockCpu = {
  brand: "Pentium 3",
  manufacturer: "Intel®",
};

const getMockCpuTemp = () => ({
  main: randomCpuTemp(28, 40),
  cores: [randomCpuTemp(28, 36), randomCpuTemp(32, 40)],
  max: 40,
});

const isMockData = process.env["MOCK_DATA"] === "1";

module.exports = {
  getCpuInfo: () => (isMockData ? mockCpu : si.cpu()),
  getCpuTemperature: () =>
    isMockData ? getMockCpuTemp() : si.cpuTemperature(),
};
