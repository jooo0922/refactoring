class Order {
  constructor(data) {
    this.priority = data.priority;
    // 나머지 초기화 코드 생략
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
