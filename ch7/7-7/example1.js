// 서버 객체
class Person {
  constructor(name) {
    this._name = name;
    this._department = new Department();
  }
  get name() {
    return this._name;
  }
  get department() {
    return this._department;
  }
  set department(arg) {
    this._department = arg;
  }
}

// 위임 객체
class Department {
  constructor() {
    this._chargeCode = "asf";
    this._manager = "john";
  }

  get chargeCode() {
    return this._chargeCode;
  }
  set chargeCode(arg) {
    this._chargeCode = arg;
  }
  get manager() {
    return this._manager;
  }
  set manager(arg) {
    this._manager = arg;
  }
}
