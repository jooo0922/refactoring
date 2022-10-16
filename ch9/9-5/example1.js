import Customer from "./Customer";
import { registerCustomer } from "./repository";

// 주문목록 클래스
class Order {
  constructor(data) {
    this._number = data.number;
    this._customer = registerCustomer(data.customer); // data.customer(고객 ID)를 입력받아 유일한 고객데이터를 저장소 객체에 등록 -> 동일한 Entity에 대하여 고객데이터 중복생성 방지
    // 다른 데이터를 읽어들인다.
  }

  get customer() {
    return this._customer;
  }
}
