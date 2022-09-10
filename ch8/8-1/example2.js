class Account {
  constructor() {
    this._daysOverdrawn = 1;
    this.type = {
      isPremium: true,
    };
  }

  // 은행 이자 계산
  get backCharge() {
    let result = 4.5;
    if (this._daysOverdrawn > 0) result += this.overdraftCharge;
    return result;
  }

  // 초과 인출 이자 계산
  get overDraftCharge() {
    if (this.type.isPremium) {
      const baseCharge = 10;
      if (this._daysOverdrawn <= 7) return baseCharge;
      else return baseCharge + (this._daysOverdrawn - 7) * 0.85;
    } else {
      return this._daysOverdrawn * 1.75;
    }
  }
}

class AccountType {
  constructor() {}
}
