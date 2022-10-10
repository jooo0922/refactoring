class ProductionPlan {
  constructor(production) {
    this._production = production;
    this._adjustments = [];
  }

  get production() {
    return this._adjustments.reduce((sum, a) => sum + a.amount, 0); // production 값 누적 계산을 질의함수로 변경
  }
  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment);
  }
}
