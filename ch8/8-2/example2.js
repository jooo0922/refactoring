class Account {
  constructor(number, type, interestRate) {
    this._number = number;
    this._type = type;
    // 기존 Account 클래스에 매개변수로 받는 이자율과 AccountType 클래스의 이자율이 같은지 체크함.
    // 이 값이 같아야 리팩토링이라고 할 수 있고, 이 값이 다르다면 리팩토링이라고 할 수 없음. 필드의 값이 변경되면 겉보기 동작이 달라지니까!
    assert(interestRate === this._type.interestRate);
    this._interestRate = interestRate;
  }

  // 필드 캡슐화는 이미 잘 되어있음.
  get interestRate() {
    return this._interestRate;
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
