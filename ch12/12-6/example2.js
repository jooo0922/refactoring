class Employee {
  constructor(name, type) {
    this._name = name;
    this._type = type;
  }

  get typeString() {
    return this._type.toString();
  }

  get type() {
    return this._type;
  }

  set type(arg) {
    this._type = new EmployeeType(arg);
  }

  static createEmployeeType(aString) {
    switch (aString) {
      case "engineer":
        return new Engineer();
      case "manager":
        return new Manager();
      case "salesperson":
        return new Salesperson();
      default:
        throw new Error(`${arg}라는 직원 유형은 없습니다.`);
    }
  }

  get capitalizedType() {
    return (
      this.typeString.charAt(0).toUpperCase() +
      this.typeString.substr(1).toLowerCase()
    );
  }

  toString() {
    return `${this._name} (${this.capitalizedType})`;
  }
}

class EmployeeType {}

class Engineer extends EmployeeType {
  toString() {
    return "engineer";
  }
}

class Manager extends EmployeeType {
  toString() {
    return "manager";
  }
}

class Salesperson extends EmployeeType {
  toString() {
    return "salesperson";
  }
}
