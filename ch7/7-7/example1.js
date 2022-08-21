// 서버 객체
class Person {
  constructor(name) {
    this._name = name;
    this._department = new Department();
  }
  get name() {
    return this._name;
  }
  // 위임 객체에서 데이터를 가져오는 위임메서드 생성
  get manager() {
    return this._department.manager;
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

// 클라이언트 코드
const aPerson = new Person("jack");
const manager = aPerson.manager; // 클라이언트에서 위임메서드를 사용하도록 수정
