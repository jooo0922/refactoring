class Employee {
  constructor(name) {
    // ...
  }
  get isPrivileged() {
    // ...
  }
  assignCar() {
    // ...
  }
  finishConstruction() {
    if (this.isPrivileged) this.assignCar();
  }
}

class Manager extends Employee {
  constructor(name, grade) {
    super(name);
    this._grade = grade;
    this.finishConstruction(); // 모든 서브클래스가 수행
  }

  get isPrivileged() {
    return this._grade > 4;
  }
}
