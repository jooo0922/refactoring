class Employee {
  constructor(name, typeCode) {
    this._name = name;
    this._typeCode = typeCode;
  }

  get name() {
    return this._name;
  }

  get type() {
    return Employee.legalTypeCodes[this._typeCode];
  }

  static get legalTypeCodes() {
    return { E: "Engineer", M: "Manager", S: "Salesperson" };
  }
}

function createEmployee(name, typeCode) {
  return new Employee(name, typeCode);
}

function createEngineer(name) {
  return new Employee(name, "E");
}

// 호출자1
let candidate;
candidate = createEmployee(document.name, document.empType);

// 호출자2
const leadEngineer = createEngineer(document.leadEngineer); // 함수에 문자열 리터럴을 인자로 전달하는 것은 '악취'에 해당하기 때문에, 해당 타입 전용 Employee 인스턴스를 생성하는 팩터리 함수를 추가로 선언함.
