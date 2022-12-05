const thermostat = {}; // 전역객체

class HeatingPlan {
  targetTemperature(selectedTemperature) {
    if (selectedTemperature > this._max) return _max;
    else if (selectedTemperature < this._min) return _min;
    else return selectedTemperature;
  }
}

// 호출자
const thePlan = new HeatingPlan();
if (
  thePlan.targetTemperature(thermostat.selectedTemperature) >
  thermostat.currentTemperature
)
  setToHeat();
else if (
  thePlan.targetTemperature(thermostat.selectedTemperature) <
  thermostat.currentTemperature
)
  setToCool();
else setOff();
