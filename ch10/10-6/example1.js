class Customer {
  constructor() {
    this.discountRate = 10;
  }

  applyDiscount(aNumber) {
    if (!this.discountRate) return aNumber;
    else return aNumber - this.discountRate * aNumber;
  }
}
