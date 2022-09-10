class Account {
  constructor() {
    this.type = new AccountType();
  }

  // 은행 이자 계산
  get backCharge() {
    let result = 4.5;
    if (this.daysOverdrawn > 0)
      result += this.type.overDraftCharge(this.daysOverdrawn); // 위임 메서드 인라인
    return result;
  }

  get daysOverdrawn() {
    return 1;
  }
}

class AccountType {
  constructor() {
    this.isPremium = true;
  }

  // 초과 인출 이자 계산 메서드를 AccountType 으로 이동 -> 계좌타입이 프리미엄인지 아닌지에 따라 계산이 달라지므로, 계좌타입 클래스에 있는게 더 적합함.
  // daysOverDrawn() 메서드는 Accout 클래스에도 필요하므로, 매개변수로 값을 넘기도록 함.
  overDraftCharge(daysOverdrawn) {
    if (this.isPremium) {
      const baseCharge = 10;
      if (this._daysOverdrawn <= 7) return baseCharge;
      else return baseCharge + (daysOverdrawn - 7) * 0.85;
    } else {
      return daysOverdrawn * 1.75;
    }
  }
}
