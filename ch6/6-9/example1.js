function acquireReading() {
  return {
    customer: "ivan",
    quantity: 10,
    month: 5,
    year: 2017,
  };
}

function baseRate(month, year) {
  // 임시로 작성한 함수
  return 0.5;
}

function taxThreshold(year) {
  return 1;
}

const aReading = acquireReading();
const base = baseRate(aReading.month, aReading.year) * aReading.quantity;
const texableCharge = Math.max(0, base - taxThreshold(aReading.year));
