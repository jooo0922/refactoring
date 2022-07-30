class Order {
  constructor(aRecord) {
    this._data = aRecord;
  }

  get quantity() {
    return this._data.quantity;
  }

  get itemPrice() {
    return this._data.itemPrice;
  }

  get price() {
    return this.basePrice - this.quantityDiscount + this.shipping;
  }

  // price() 내에서만 사용할 게 아니라, 클래스처럼 넓은 문맥에서도 사용할 거라면,
  // 변수가 아닌 메서드(특히, getter)로 추출하는 편이 낫다!
  get shipping() {
    return Math.min(this.basePrice * 0.1, 100);
  }

  get quantityDiscount() {
    return Math.max(0, this.quantity - 500) * this.itemPrice * 0.05;
  }

  get basePrice() {
    return this.quantity * this.itemPrice;
  }
}
