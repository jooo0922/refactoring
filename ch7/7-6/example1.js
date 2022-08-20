// 배송 클래스 (타깃 클래스)
class Shipment {
  constructor() {
    this._shippingCompany = "A택배";
    this._trackingNumber = "102834740";
  }

  get trackingInfo() {
    return `${this.shippingCompany}: ${this.trackingNumber}`;
  }
  get shippingCompany() {
    return this._shippingCompany;
  }
  set shippingCompany(arg) {
    this._shippingCompany = arg;
  }
  get trackingNumber() {
    return this._trackingNumber;
  }
  set trackingNumber(arg) {
    this._trackingNumber = arg;
  }
}

// 클라이언트
const request = {
  vendor: "B택배",
};
const aShipment = new Shipment();
aShipment.shippingCompany = request.vendor; // 클라이언트 코드가 위임 메서드를 사용하도록 변경
