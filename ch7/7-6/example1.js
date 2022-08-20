// 배송 클래스 (타깃 클래스)
class Shipment {
  constructor() {
    this._trackingInformation = new TrackingInformation();
  }

  get trackingInfo() {
    return this._trackingInformation.display;
  }
  get trackingInformation() {
    return this._trackingInformation;
  }
  set trackingInformation(aTrackingInformation) {
    this._trackingInformation = aTrackingInformation;
  }
  set shippingCompany(arg) {
    this._trackingInformation.shippingCompany = arg;
  } // 타깃 클래스에 위임 메서드 생성
}

// 배송 추적 정보 클래스 (소스 클래스)
class TrackingInformation {
  constructor() {
    this._shippingCompany = "A택배";
    this._trackingNumber = "102834740";
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
  get display() {
    return `${this.shippingCompany}: ${this.trackingNumber}`;
  }
}

// 클라이언트
const request = {
  vendor: "B택배",
};
const aShipment = new Shipment();
aShipment.shippingCompany = request.vendor; // 클라이언트 코드가 위임 메서드를 사용하도록 변경
