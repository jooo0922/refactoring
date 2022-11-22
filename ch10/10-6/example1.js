const assert = require("assert");

class Customer {
  constructor() {
    this._discountRate = null;
  }

  get discountRate() {
    return this._discountRate;
  }

  set discountRate(aNumber) {
    assert(null === aNumber || aNumber >= 0); // 세터에서 처음부터 값을 변경하는 시점부터 어서션으로 체크해야 어디서부터 처음 에러가 발생했는지 확인하기 수월함!
    this._discountRate = aNumber;
  }

  applyDiscount(aNumber) {
    if (!this.discountRate) return aNumber;
    else {
      return aNumber - this.discountRate * aNumber;
    }
  }
}

const customer = new Customer();
customer.discountRate = 10;
customer.applyDiscount();
