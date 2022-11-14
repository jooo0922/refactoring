// 클라이언트 1
const site = new Site();
const aCustomer = site.customer;
// ... 수많은 코드 ...
let customerName = aCustomer.name;

// 클라이언트 2
const plan = isUnknown(aCustomer)
  ? registry.billingPlan.basic
  : aCustomer.billingPlan;

// 클라이언트 3
const weeksDeliquent = isUnknown(aCustomer)
  ? 0
  : aCustomer.paymentHistory.weeksDeliquentInLastYear;

// 특이 케이스 검사 조건 함수 추출
function isUnknown(arg) {
  return arg.isUnknown;
}

// 최상위...
function createUnknownCustomer() {
  // 특이 케이스가 리터럴 객체
  return {
    isUnknown: true,
    name: "거주자",
  };
}

class Site {
  constructor() {
    this._customer = new Customer(); // 이 필드는 일반적인 케이스에서는 Customer 클래스 인스턴스가 들어가지만, 예외 케이스에서는 "미확인 고객" 이라는 문자열이 들어감.
  }

  get customer() {
    return this._customer === "미확인 고객"
      ? createUnknownCustomer()
      : this._customer;
  }
}

class Customer {
  constructor() {
    this._name = "John"; // 고객 이름
    this._billingPlan = {}; // 요금제
    this._paymentHistory = {}; // 납부 이력
  }

  get name() {
    return this._name;
  }

  get billingPlan() {
    return this._billingPlan;
  }

  set billingPlan(arg) {
    this._billingPlan = arg;
  }

  get paymentHistory() {
    return this._paymentHistory;
  }

  get isUnknown() {
    return false;
  }
}
