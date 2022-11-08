function plumages(bird) {
  return createBird(bird).plumage;
}

function speeds(bird) {
  return createBird(bird).airSpeedVelocity;
}

// 서브클래스 인스턴스를 생성하는 팩토리 함수
function createBird(bird) {
  switch (bird.type) {
    case "유럽 제비":
      return new EuropeanSwallow(bird);
    case "아프리카 제비":
      return new AfricanSwallow(bird);
    case "노르웨이 파랑 앵무":
      return new NorwegianBlueParrot(bird);
    default:
      return new Bird(bird);
  }
}

// 종별 서브클래스
class EuropeanSwallow extends Bird {
  // 조건부 메서드 오버라이드
  get plumage() {
    return "보통이다";
  }

  // 다른 조건부 메서드 오버라이드
  get airSpeedVelocity() {
    return 35;
  }
}

class AfricanSwallow extends Bird {
  // 조건부 메서드 오버라이드
  get plumage() {
    return this.numberOfCoconuts > 2 ? "지쳤다" : "보통이다";
  }

  // 다른 조건부 메서드 오버라이드
  get airSpeedVelocity() {
    return 40 - 2 * this.numberOfCoconuts;
  }
}

class NorwegianBlueParrot extends Bird {
  // 조건부 메서드 오버라이드
  get plumage() {
    return this.voltage > 100 ? "그을렸다" : "예쁘다";
  }

  // 다른 조건부 메서드 오버라이드
  get airSpeedVelocity() {
    return this.isNailed ? 0 : 10 + this.voltage / 10;
  }
}

// 슈퍼 클래스
class Bird {
  constructor(birdObject) {
    Object.assign(this, birdObject);
  }

  // 깃털 상태 반환 게터
  get plumage() {
    // 슈퍼클래스 메서드는 기본 동작용으로 남겨놓음.
    return "알 수 없다";
  }

  // 비행 속도 반환 함수
  get airSpeedVelocity() {
    // 슈퍼클래스 메서드는 기본 동작용으로 남겨놓음.
    return null;
  }
}
