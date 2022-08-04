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
  // 임시로 작성한 함수
  return 1;
}

class Reading {
  constructor(data) {
    this._customer = data.customer;
    this._quantity = data.quantity;
    this._month = data.month;
    this._year = data.year;
  }
  get customer() {
    return this._customer;
  }
  get quantity() {
    return this._quantity;
  }
  get month() {
    return this._month;
  }
  get year() {
    return this._year;
  }
}

const aReading = acquireReading();
const base = calculateBaseCharge(aReading);
const texableCharge = Math.max(0, base - taxThreshold(aReading.year));

// 기본 요금 계산 함수 추출
function calculateBaseCharge(aReading) {
  return baseRate(aReading.month, aReading.year) * aReading.quantity;
}
