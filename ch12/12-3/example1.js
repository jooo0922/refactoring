class Party {
  constructor(name) {
    this._name = name; // 공통 코드
  }
}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super(name);
    this._id = id;
    this._monthlyCost = monthlyCost;
  }
  // 생략
}

class Department extends Party {
  constructor(name, staff) {
    super(name);
    this._staff = staff;
  }
  // 생략
}
