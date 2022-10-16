import Customer from "./Customer";

// 주문목록 클래스
class Order {
  constructor(data) {
    this._number = data.number;
    this._customer = new Customer(data.customer); // data.customer 는 고객 ID -> 고객 ID 를 받아 주문목록 클래스마다 동일한 고객 클래스를 여러개 복사해서 생성하게 됨. -> 귀찮고 비효율적!
    // 다른 데이터를 읽어들인다.
  }

  get customer() {
    return this._customer;
  }
}
