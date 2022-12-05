const thermostat = {}; // 전역객체

class HeatingPlan {
  get targetTemperature() {
    if (thermostat.selectedTemperature > this._max) return _max;
    else if (thermostat.selectedTemperature < this._min) return _min;
    else return thermostat.selectedTemperature;
  }
}

// 호출자
const thePlan = new HeatingPlan();
if (thePlan.targetTemperature > thermostat.currentTemperature) setToHeat();
else if (thePlan.targetTemperature < thermostat.currentTemperature) setToCool();
else setOff();
