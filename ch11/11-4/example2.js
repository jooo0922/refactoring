// 호출자...
const aPlan = new HeatingPlan();
const tempRange = aRoom.daysTempRange;
const isWithinRange = xxNEWwithinRange(aPlan, tempRange);
if (!isWithinRange) alerts.push("방 온도가 지정 범위를 벗어났습니다.");

class HeatingPlan {
  withinRange(bottom, top) {
    return (
      bottom >= this._temperatureRange.low && top <= this._temperatureRange.high
    );
  }
}

function xxNEWwithinRange(aPlan, tempRange) {
  const low = tempRange.low;
  const high = tempRange.high;
  const isWithinRange = aPlan.withinRange(low, high);
  return isWithinRange;
}
