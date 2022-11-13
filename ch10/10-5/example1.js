// 클라이언트 1
const site = new Site();
const aCustomer = site.customer;
// ... 수많은 코드 ...
let customerName;
if (aCustomer === "미확인 고객") customerName = "거주자";
else customerName = aCustomer.name;

// 클라이언트 2
const plan =
  aCustomer === "미확인 고객"
    ? registry.billingPlan.basic
    : aCustomer.billingPlan;

// 클라이언트 3
if (aCustomer !== "미확인 고객") aCustomer.billingPlan = newPlan;

// 클라이언트 4
const weeksDeliquent =
  aCustomer === "미확인 고객"
    ? 0
    : aCustomer.paymentHistory.weeksDeliquentInLastYear;

class Site {
  constructor() {
    this._customer = new Customer(); // 이 필드는 일반적인 케이스에서는 Customer 클래스 인스턴스가 들어가지만, 예외 케이스에서는 "미확인 고객" 이라는 문자열이 들어감.
  }

  get customer() {
    return this._customer;
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

  // 미확인 고객인지를 나타내는 메서드 (특이 케이스인지 검사하는 메서드)
  get isUnknown() {
    return false; // Customer 는 일반적인 케이스에 대한 클래스 (컨테이너) 이므로, 예외 케이스가 아니니까 항상 false 를 리턴하는 게 맞겠지!
  }
}
