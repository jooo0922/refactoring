// 팩터리 함수
function createBird(data) {
  switch (data.type) {
    case "노르웨이 파랑 앵무":
      return new NorwegianBlueParrot(data);
    default:
      return new Bird(data);
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
    return this._speciesDelegate // 위임 존재 여부 검사 보호코드
      ? this._speciesDelegate.airSpeedVelocity
      : null;
  }

  selectSpeciesDelegate(data) {
    switch (data.type) {
      case "유럽 제비":
        return new EuropeanSwallowDelegate();
      case "아프리카 제비":
        return new AfricanSwallowDelegate(data);
      case "노르웨이 파랑 앵무":
        return new NorwegianBlueParrotDelegate(data);
      default:
        return null;
    }
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
    return this._speciesDelegate.airSpeedVelocity;
  }
}

// 서브클래스마다 위임클래스 별도 생성
class EuropeanSwallowDelegate {
  get airSpeedVelocity() {
    return 35;
  }
}

class AfricanSwallowDelegate {
  // 이번 위임클래스는 서브클래스에 특화된 데이터(numberOfCoconuts 가 담긴 data)들을 전부 받도록 함.
  constructor(data) {
    this._numberOfCoconuts = data.numberOfCoconuts;
  }

  get airSpeedVelocity() {
    return 40 - 2 * this._numberOfCoconuts;
  }
}

class NorwegianBlueParrotDelegate {
  constructor(data) {
    this._voltage = data.voltage;
    this._isNailed = data.isNailed;
  }

  get airSpeedVelocity() {
    return this._isNailed ? 0 : 10 + this._voltage / 10;
  }
}
