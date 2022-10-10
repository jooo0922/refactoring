class ProductionPlan {
  constructor(production) {
    // 파생변수를 둘로 쪼갬 (초기값 + 누산기)
    this._initialProduction = production;
    this._productionAccumulator = 0;
    this._adjustments = [];
  }

  get production() {
    return this.calculatedProductionAccumulator;
  }
  get calculatedProductionAccumulator() {
    return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
  }
  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment);
  }
}
