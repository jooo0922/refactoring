const assert = require("assert");
const customer = new Customer();
customer.applyDiscount();

class Customer {
  constructor() {
    this._discountRate = 10;
  }

  get discountRate() {
    return this._discountRate;
  }

  set discountRate(aNumber) {
    this._discountRate = aNumber;
  }

  applyDiscount(aNumber) {
    if (!this.discountRate) return aNumber;
    else {
      assert(this.discountRate >= 0); // 터미널에서 node example1.js 실행하여 어서션이 에러메시지를 던지는지 확인해보기
      return aNumber - this.discountRate * aNumber;
    }
  }
}
