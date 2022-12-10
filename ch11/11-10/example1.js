// 명령 객체
class ChargeCalculator {
  constructor(customer, usage, provider) {
    this._customer = customer;
    this._usage = usage;
    this._provider = provider;
  }

  // 보조 메서드
  get baseCharge() {
    return this._customer.baseRate * this._usage;
  }

  // 명령 실행 메서드
  get charge() {
    return this.baseCharge + this._provider.connectionCharge;
  }
}

// 호출자...
monthCharge = charge(customElements, usage, provider);

// 명령 객체 생성 및 실행 호출 코드를 함수로 추출
function charge(customElements, usage, provider) {
  return new ChargeCalculator(customElements, usage, provider).charge;
}
