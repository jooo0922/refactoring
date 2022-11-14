// 클라이언트 1
const site = new Site();
const aCustomer = site.customer;
// ... 수많은 코드 ...
let customerName;
if (isUnknown(aCustomer)) customerName = "거주자";
else customerName = aCustomer.name;

// 클라이언트 2
const plan = isUnknown(aCustomer)
  ? registry.billingPlan.basic
  : aCustomer.billingPlan;

// 클라이언트 3
if (!isUnknown(aCustomer)) aCustomer.billingPlan = newPlan;

// 클라이언트 4
const weeksDeliquent = isUnknown(aCustomer)
  ? 0
  : aCustomer.paymentHistory.weeksDeliquentInLastYear;

// 미확인 고객(특이 케이스) 검사 함수 추출
function isUnknown(arg) {
  if (!(arg instanceof Customer || arg === "미확인 고객"))
    throw new Error(`잘못된 값과 비교: <${arg}>`); // arg 에 엉뚱한 값이 들어왔을 때 에러를 던져 예외처리함
  return arg === "미확인 고객";
}

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

// 미확인 고객 전용 클래스 (특이 케이스 객체)
class UnknownCustomer {
  constructor() {}

  // 특이 케이스인지 검사하는 메서드
  get isUnknown() {
    return true; // 이 클래스 자체가 특이 케이스 클래스이므로 항상 true 를 리턴하는 게 맞겠지
  }
}
