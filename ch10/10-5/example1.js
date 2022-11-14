// 클라이언트 1
const site = new Site();
const aCustomer = site.customer;
// ... 수많은 코드 ...
// 이제 특이 케이스 클래스에서도 name() 게터가 존재하기 때문에, 굳이 조건문으로 특이 케이스인지 따져보지 않아도 됨.
// -> Customer 와 UnknownCustomor 둘 다 name() 게터가 있으니까, 뭐가 됬건 각자의 name 을 리턴하겠지!
let customerName = aCustomer.name;

// 클라이언트 2
const plan = aCustomer.billingPlan; // 요금제에 대해서도 특이 케이스에 게터를 만들고, 일반적인 기본값을 반환하도록 함.

// 클라이언트 3
aCustomer.billingPlan = newPlan; // 특이 케이스 클래스에도 세터를 만들어만 놓고, 내부에서 아무것도 하지 않도록 함. -> 특이 케이스는 항상 불변이어야 하기 때문! '특이 케이스'인데 값이 바뀐다는게 말이 안되잖아! 그건 특이 케이스가 아니지!

// 클라이언트 4
// 특이 케이스 객체가 또 하나의 객체를 반환해야 한다면(paymentHistory), 그 객체 역시 특이 케이스 객체로 만들어 줌!
const weeksDeliquent = aCustomer.paymentHistory.weeksDeliquentInLastYear;

// 미확인 고객(특이 케이스) 검사 함수 추출
function isUnknown(arg) {
  if (!(arg instanceof Customer || arg instanceof UnknownCustomer))
    throw new Error(`잘못된 값과 비교: <${arg}>`); // arg 에 엉뚱한 값이 들어왔을 때 에러를 던져 예외처리함
  return arg.isUnknown; // 특이케이스 검사 함수에서 특이케이스 클래스의 isUnknown() 메서드를 사용하도록 수정 -> 더이상 문자열로 특이케이스를 판단하는 코드는 없음!
}

class Site {
  constructor() {
    this._customer = new Customer(); // 이 필드는 일반적인 케이스에서는 Customer 클래스 인스턴스가 들어가지만, 예외 케이스에서는 "미확인 고객" 이라는 문자열이 들어감.
  }

  get customer() {
    return this._customer === "미확인 고객"
      ? new UnknownCustomer()
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

  // 미확인 고객인지를 나타내는 메서드 (특이 케이스인지 검사하는 메서드)
  get isUnknown() {
    return false; // Customer 는 일반적인 케이스에 대한 클래스 (컨테이너) 이므로, 예외 케이스가 아니니까 항상 false 를 리턴하는 게 맞겠지!
  }
}

// 미확인 고객 전용 클래스 (특이 케이스 객체)
class UnknownCustomer {
  constructor() {}

  // 특이 케이스 관련 동작을 특이 케이스 클래스의 메서드로 옮김
  get name() {
    return "거주자";
  }

  get billingPlan() {
    return registry.billingPlan.basic;
  }

  set billingPlan(arg) {
    /** 특이 케이스 클래스의 세터는 아무런 일도 하지 않음. -> 특이 케이스는 값 객체이므로, 항상 불변이어야 하기 때문! */
  }

  get paymentHistory() {
    return new NullPaymentHistory(); // 특이 케이스 클래스가 또 하나의 객체를 반환할 경우, 그 객체 역시 특이 케이스 객체로 만들 것!
  }

  // 특이 케이스인지 검사하는 메서드
  get isUnknown() {
    return true; // 이 클래스 자체가 특이 케이스 클래스이므로 항상 true 를 리턴하는 게 맞겠지
  }
}

// 특이 케이스 객체가 또 하나의 객체를 반환해야 한다면(paymentHistory), 그 객체 역시 특이 케이스 객체로 만들어 줄 것!
class NullPaymentHistory {
  constructor() {}

  get weeksDeliquentInLastYear() {
    return 0;
  }
}
