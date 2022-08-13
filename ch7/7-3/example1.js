class Order {
  constructor(data) {
    this._priority = new Priority(data.priority);
    // 나머지 초기화 코드 생략
  }
  // priority 객체를 제공하는 게터 추가
  get priority() {
    return this._priority;
  }
  // 필드 캡슐화(자가 캡슐화)를 위한 접근자 지정
  // 이제 이 게터는 우선순위 자체보다는 우선순위를 표현한 문자열을 반환하므로, 함수 이름을 수정함.
  get priorityString() {
    return this._priority.toString();
  }
  set priority(aString) {
    this._priority = new Priority(aString);
  }
}

// priority 변수의 값 클래스 생성
class Priority {
  // 1. 값을 받는 생성자
  constructor(value) {
    this._value = value;
  }
  // 2. 값을 문자열로 반환하는 반환함수 (게터보다는 반환함수 사용이 더 자연스러움)
  toString() {
    return this._value;
  }
}

// 클라이언트...
let orders = [];
orders.push(new Order({ priority: "high" }));
orders.push(new Order({ priority: "rush" }));
orders.push(new Order({ priority: "low" }));

const highPriorityCount = orders.filter(
  (o) => o.priorityString === "high" || o.priorityString === "rush"
).length;
