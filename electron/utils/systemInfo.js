const si = require("systeminformation");

async function getCpuTemperature() {
  try {
    si.cpuTemperature((val) => {});
    const temp = await si.cpuTemperature();

    return temp.main;
  } catch (error) {
    console.log("error " + error);
  }
}

module.exports = {
  getCpuInfo: () => si.cpu(),
  getCpuTemperature,
};
