class ProductionPlan {
  constructor(production) {
    this._production = production;
    this._adjustments = [];
  }

  get production() {
    assert(this._production === this.calculatedProduction);
    return this._production;
  }
  get calculatedProduction() {
    return this._adjustments.reduce((sum, a) => sum + a.amount, 0); // production 값 누적 계산을 질의함수로 변경
  }
  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment);
    this._production += anAdjustment.amount; // production 값 누적 계산을 굳이 여기서? 그리고 anAdjustment 가 추가될때마다 자주 변경되는 가변데이터임.
  }
}
