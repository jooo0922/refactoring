const thermostat = {}; // 전역객체

class HeatingPlan {
  get targetTemperature() {
    const selectedTemperature = thermostat.selectedTemperature; // 전역변수 질의코드를 임시변수로 추출
    return this.xxNEWtargetTemperature(selectedTemperature);
  }

  xxNEWtargetTemperature(selectedTemperature) {
    if (selectedTemperature > this._max) return _max;
    else if (selectedTemperature < this._min) return _min;
    else return selectedTemperature;
  }
}

// 호출자
const thePlan = new HeatingPlan();
if (thePlan.targetTemperature > thermostat.currentTemperature) setToHeat();
else if (thePlan.targetTemperature < thermostat.currentTemperature) setToCool();
else setOff();
