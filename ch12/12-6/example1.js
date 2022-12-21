class Employee {
  constructor(name) {
    this._name = name;
  }
}

class Engineer extends Employee {
  get type() {
    return "engineer";
  }

  toString() {
    return `${this._name} (${this.type})`;
  }
}

class Salesperson extends Employee {
  get type() {
    return "salesperson";
  }

  toString() {
    return `${this._name} (${this.type})`;
  }
}

class Manager extends Employee {
  get type() {
    return "manager";
  }

  toString() {
    return `${this._name} (${this.type})`;
  }
}

function createEmployee(name, type) {
  switch (type) {
    case "engineer":
      return new Engineer(name);
    case "salesperson":
      return new Salesperson(name);
    case "manager":
      return new Manager(name);
    default:
      throw new Error(`${type}라는 직원 유형은 없습니다.`);
  }
}
