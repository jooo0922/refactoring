class SubclassResponsibilityError extends Error {
  constructor(errorCode) {
    super(`서브클래스 책임 오류: ${errorCode}`);
    this.code = errorCode;
  }
  get name() {
    return "SubclassResponsibilityError";
  }
}

class Party {
  // 자바스크립트는 동적 언어이므로, 추상 메서드 monthlyCost 가 슈퍼클래스에 없더라도, 서브클래스에서 정의하기만 하면 사용할 수 있음.
  // 다만, 서브클래스에서 정의를 안하면 아예 존재하지 않는 추상 메서드가 되므로, 정의하지 않을 시 '서브클래스 책임 오류'를 에러 객체로 던지도록 하는 함정 메서드를 만듦.
  get monthlyCost() {
    throw new SubclassResponsibilityError();
  }

  get annualCost() {
    return this.monthlyCost * 12;
  }
}

class Employee extends Party {
  get monthlyCost() {
    return 30;
  }
}

class Department extends Party {
  get monthlyCost() {
    return 22;
  }
}
