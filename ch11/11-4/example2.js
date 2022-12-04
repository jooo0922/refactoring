// 호출자...
const aPlan = new HeatingPlan();
const tempRange = aRoom.daysTempRange;
const isWithinRange = aPlan.xxNEWwithinRange(tempRange);
if (!isWithinRange) alerts.push("방 온도가 지정 범위를 벗어났습니다.");

class HeatingPlan {
  xxNEWwithinRange(tempRange) {
    const isWithinRange =
      tempRange.low >= this._temperatureRange.low &&
      tempRange.high <= this._temperatureRange.high;
    return isWithinRange;
  }
}
