// 호출자...
const aPlan = new HeatingPlan();
if (!aPlan.withinRange(aRoom.daysTempRange))
  alerts.push("방 온도가 지정 범위를 벗어났습니다.");

class HeatingPlan {
  withinRange(aNumberRange) {
    return (
      aNumberRange.bottom >= this._temperatureRange.low &&
      aNumberRange.top <= this._temperatureRange.high
    );
  }
}
