// 호출자...
const aPlan2 = new HeatingPlan2();
const tempRange = aRoom.daysTempRange;
const isWithinRange = aPlan2.withinRange(tempRange);
if (!isWithinRange) alerts.push("방 온도가 지정 범위를 벗어났습니다.");

class HeatingPlan2 {
  withinRange(tempRange) {
    return (
      tempRange.low >= this._temperatureRange.low &&
      tempRange.high <= this._temperatureRange.high
    );
  }
}
