const si = require("systeminformation");

module.exports = {
  getCpuInfo: () => si.cpu(),
  getCpuTemperature: () => si.cpuTemperature(),
};
