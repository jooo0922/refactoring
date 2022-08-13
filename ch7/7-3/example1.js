class Order {
  constructor(data) {
    this._priority = data.priority;
    // 나머지 초기화 코드 생략
  }
  // 필드 캡슐화(자가 캡슐화)를 위한 접근자 지정
  get priority() {
    return this._priority;
  }
  set priority(aString) {
    this._priority = aString;
  }
}

// 클라이언트...
let orders = [];
orders.push(new Order({ priority: "high" }));
orders.push(new Order({ priority: "rush" }));
orders.push(new Order({ priority: "low" }));

const highPriorityCount = orders.filter(
  (o) => o.priority === "high" || o.priority === "rush"
).length;
