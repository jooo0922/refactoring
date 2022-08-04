const station = {
  name: "ZB1",
  readings: [
    { temp: 47, time: "2016-11-10 09:10" },
    { temp: 53, time: "2016-11-10 09:20" },
    { temp: 58, time: "2016-11-10 09:30" },
    { temp: 53, time: "2016-11-10 09:40" },
    { temp: 51, time: "2016-11-10 09:50" },
  ],
};

class NumberRange {
  constructor(min, max) {
    this._data = {
      min: min,
      max: max,
    };
  }
  get min() {
    return this._data.min;
  }
  get max() {
    return this._data.max;
  }

  // 매개변수를 클래스로 만들면, 관련 동작들을 이 클래스로 옮길 수 있음!
  contains(arg) {
    return arg >= this.min && arg <= this.max;
  }
}

// 정상 범위를 벗어난 측정값을 찾는 함수
function readingsOutsideRange(station, range) {
  return station.readings.filter((r) => !range.contains(r.temp));
}

const operatingPlan = {
  temperatureFloor: 50,
  temperatureCeiling: 60,
};

const range = new NumberRange(
  operatingPlan.temperatureFloor,
  operatingPlan.temperatureCeiling
);

const alerts = readingsOutsideRange(station, range);
