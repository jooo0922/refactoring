// 팩터리 함수
function createBird(data) {
  switch (data.type) {
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
    return this._speciesDelegate.plumage; // Bird 위임 메서드가 간결해짐.
  }
  get airSpeedVelocity() {
    return this._speciesDelegate.airSpeedVelocity; // Bird 위임 메서드가 간결해짐.
  }

  selectSpeciesDelegate(data) {
    switch (data.type) {
      case "유럽 제비":
        return new EuropeanSwallowDelegate(data, this);
      case "아프리카 제비":
        return new AfricanSwallowDelegate(data, this);
      case "노르웨이 파랑 앵무":
        return new NorwegianBlueParrotDelegate(data, this); // 슈퍼클래스 역참조를 위해 해당 위임클래스에 Bird 클래스 인수로 전달
      default:
        return new SpeciesDelegate(data, this);
    }
  }
}

// plumage 메서드 중복을 해결하기 위해 위임클래스들의 슈퍼클래스 추출
class SpeciesDelegate {
  constructor(data, bird) {
    this._bird = bird;
  }

  // 위임클래스들의 슈퍼클래스에 기본동작 정의 가능
  get plumage() {
    return this._bird._plumage || "보통이다";
  }
  get airSpeedVelocity() {
    return null;
  }
  // ...
}

// 서브클래스마다 위임클래스 별도 생성
class EuropeanSwallowDelegate extends SpeciesDelegate {
  get airSpeedVelocity() {
    return 35;
  }
}

class AfricanSwallowDelegate extends SpeciesDelegate {
  // 이번 위임클래스는 서브클래스에 특화된 데이터(numberOfCoconuts 가 담긴 data)들을 전부 받도록 함.
  constructor(data, bird) {
    super(data, bird);
    this._numberOfCoconuts = data.numberOfCoconuts;
  }

  get airSpeedVelocity() {
    return 40 - 2 * this._numberOfCoconuts;
  }
}

class NorwegianBlueParrotDelegate extends SpeciesDelegate {
  constructor(data, bird) {
    super(data, bird);
    this._voltage = data.voltage;
    this._isNailed = data.isNailed;
  }

  get airSpeedVelocity() {
    return this._isNailed ? 0 : 10 + this._voltage / 10;
  }

  get plumage() {
    if (this._voltage > 100) return "그을렸다";
    else return this._bird._plumage || "예쁘다"; // 해당 메서드를 위임클래스로 옮기려면 슈퍼클래스 역참조 필요
  }
}
