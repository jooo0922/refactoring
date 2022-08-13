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
    if (value instanceof Priority) return value; // Order 의 세터가 Priority 인스턴스도 받을 수 있도록 수정
    this._value = value;
  }
  // 2. 값을 문자열로 반환하는 반환함수 (게터보다는 반환함수 사용이 더 자연스러움)
  toString() {
    return this._value;
  }

  // 우선순위의 index 를 얻는 게터
  get _index() {
    return Priority.legalValues().findIndex((s) => s === this._value);
  }

  // 유효한 우선순위 문자열들을 반환하는 동작
  static legalValues() {
    return ["low", "normal", "high", "rush"];
  }

  // 우선순위가 같은지 비교하는 동작
  equals(other) {
    return this._index === other._index;
  }

  // 우선순위가 높은지 비교하는 동작
  higherThan(other) {
    return this._index > other._index;
  }

  // 우선순위가 낮은지 비교하는 동작
  lowerThan(other) {
    return this._index < other._index;
  }
}

// 클라이언트...
let orders = [];
orders.push(new Order({ priority: "high" }));
orders.push(new Order({ priority: "rush" }));
orders.push(new Order({ priority: "low" }));

const highPriorityCount = orders.filter(
  (o) => o.priority.higherThan(new Priority("normal")) // 클라이언트 코드에서 추가한 동작들을 사용하도록 수정
).length;
