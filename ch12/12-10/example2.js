// 팩터리 함수
function createBird(data) {
  switch (data.type) {
    case "유럽 제비":
      break;

    default:
      break;
  }
}

// 슈퍼클래스
class Bird {
  constructor(data) {
    this._name = data.name;
    this._plumage = data.plumage;
    this._speciesDelegate = this.selectSpeciesDelegate(data); // 슈퍼클래스 생성자에서 위임필드 초기화
  }

  get name() {
    return this._name;
  }
  get plumage() {
    return this._plumage || "보통이다";
  }
  get airSpeedVelocity() {
    return null;
  }

  selectSpeciesDelegate(data) {
    switch (data.type) {
      case "유럽 제비":
        return new EuropeanSwallowDelegate();
      default:
        return null;
    }
  }
}

// 서브클래스1
class EuropeanSwallow extends Bird {
  get airSpeedVelocity() {
    return 35;
  }
}

// 서브클래스2
class AfricanSwallow extends Bird {
  constructor(data) {
    super(data);
    this._numberOfCoconuts = data._numberOfCoconuts;
  }

  get airSpeedVelocity() {
    return 40 - 2 * this._numberOfCoconuts;
  }
}

// 서브클래스3
class NorwegianBlueParrot extends Bird {
  constructor(data) {
    super(data);
    this._voltage = data.voltage;
    this._isNailed = data._isNailed;
  }

  get plumage() {
    if (this._voltage > 100) return "그을렸다";
    else return this._plumage || "예쁘다";
  }

  get airSpeedVelocity() {
    return this._isNailed ? 0 : 10 + this._voltage / 10;
  }
}

// 서브클래스마다 위임클래스 별도 생성
class EuropeanSwallowDelegate {}
