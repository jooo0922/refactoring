class Person {
  constructor() {
    this._telephoneNumber = new TelephoneNumber(); // 원래 클래스 생성자에 새로 추출한 클래스 인스턴스 생성
    this._name = "john";
    this._officeAreaCode = "010";
    this._officeNumber = "1234566";
  }

  get name() {
    return this._name;
  }
  set name(arg) {
    this._name = arg;
  }
  get telephoneNumber() {
    return `(${this.officeAreaCode}) ${this.officeNumber}`;
  }
  get officeAreaCode() {
    return this._officeAreaCode;
  }
  set officeAreaCode(arg) {
    this._officeAreaCode = arg;
  }
  get officeNumber() {
    return this._officeNumber;
  }
  set officeNumber(arg) {
    this._officeNumber = arg;
  }
}

// 전화번호 관련 동작 및 데이터를 별도 클래스로 추출
class TelephoneNumber {
  constructor() {}
}
