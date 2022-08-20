class Person {
  constructor() {
    this._telephoneNumber = new TelephoneNumber(); // 원래 클래스 생성자에 새로 추출한 클래스 인스턴스 생성
    this._name = "john";
  }

  get name() {
    return this._name;
  }
  set name(arg) {
    this._name = arg;
  }
  get telephoneNumber() {
    return this._telephoneNumber.toString();
  }
  get officeAreaCode() {
    return this._telephoneNumber.areaCode;
  }
  set officeAreaCode(arg) {
    this._telephoneNumber.areaCode = arg;
  }
  get officeNumber() {
    return this._telephoneNumber.number;
  }
  set officeNumber(arg) {
    this._telephoneNumber.number = arg;
  }
}

// 전화번호 관련 동작 및 데이터를 별도 클래스로 추출
class TelephoneNumber {
  constructor() {
    // 전화번호 관련 필드들을 원래 클래스에서 새 클래스로 이동
    this._areaCode = "010";
    this._number = "1234566";
  }

  toString() {
    return `(${this.areaCode}) ${this.number}`;
  }
  get areaCode() {
    return this._areaCode;
  }
  set areaCode(arg) {
    this._areaCode = arg;
  }
  get number() {
    return this._number;
  }
  set number(arg) {
    this._number = arg;
  }
}
