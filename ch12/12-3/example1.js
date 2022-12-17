class Party {}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super();
    this._name = name; // 공통 코드
    this._id = id;
    this._monthlyCost = monthlyCost;
  }
  // 생략
}

class Department extends Party {
  constructor(name, staff) {
    super();
    this._name = name; // 공통 코드
    this._staff = staff;
  }
  // 생략
}
