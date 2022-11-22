class Customer {
  constructor() {
    this.discountRate = 10;
  }

  applyDiscount(aNumber) {
    return this.discountRate ? aNumber - this.discountRate * aNumber : aNumber;
  }
}
