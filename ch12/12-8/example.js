class Employee {
  constructor(name, id, monthlyCost) {
    this._id = id;
    this._name = name;
    this._monthlyCost = monthlyCost;
  }
  // 월간비용
  get monthlyCost() {
    return this._monthlyCost;
  }
  // 이름
  get name() {
    return this._name;
  }
  get id() {
    return this._id;
  }

  // 연간비용
  get annualCost() {
    return this.monthlyCost * 12;
  }
}

class Department {
  constructor(name, staff) {
    this._name = name;
    this._staff = staff;
  }
  get staff() {
    return this._staff;
  }
  // 이름
  get name() {
    return this._name;
  }

  // 총 월간 비용
  get totalMonthlyCost() {
    return this.staff
      .map((e) => e.monthlyCost)
      .reduce((sum, cost) => sum + cost);
  }
  get headCount() {
    return this.staff.length;
  }
  // 총 연간 비용
  get totalAnnualCost() {
    return this.totalMonthlyCost * 12;
  }
}
