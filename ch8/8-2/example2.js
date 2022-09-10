class Account {
  constructor(number, type) {
    this._number = number;
    this._type = type;
  }

  // 필드 캡슐화는 이미 잘 되어있음.
  get interestRate() {
    return this._type.interestRate;
  }
}

class AccountType {
  constructor(nameString, interestRate) {
    this._name = nameString;
    this._interestRate = interestRate;
  }

  get interestRate() {
    return this._interestRate;
  }
}

const accountType = new AccountType("가나계좌", 10.2);
const account = new Account(10, accountType, 10.2);
