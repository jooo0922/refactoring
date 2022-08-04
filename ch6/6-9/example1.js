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

  // 함수 옮기기
  get baseCharge() {
    return baseRate(this.month, this.year) * this.quantity;
  }
}

const rawReading = acquireReading();
const aReading = new Reading(rawReading); // 데이터 객체 생성
const texableCharge = texableChargeFn(aReading);

function texableChargeFn(aReading) {
  return Math.max(0, aReading.baseCharge - taxThreshold(aReading.year)); // 기본요금 메서드 인라인
}
