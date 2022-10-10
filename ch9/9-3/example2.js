class ProductionPlan {
  constructor(production) {
    // 파생변수를 둘로 쪼갬 (초기값 + 누산기)
    this._initialProduction = production;
    this._productionAccumulator = 0;
    this._adjustments = [];
  }

  get production() {
    assert(
      this._productionAccumulator === this.calculatedProductionAccumulator
    );
    return this._initialProduction + this._productionAccumulator;
  }
  get calculatedProductionAccumulator() {
    return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
  }
  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment);
    this._production += anAdjustment.amount;
  }
}
