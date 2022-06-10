"use strict";

// 조건부 로직을 다형성으로 바꾸기 위해 상속 계층 클래스 생성 (공연 관련 데이터 계산하는 함수들로 구성)
class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  // amountFor() 함수 계산기 클래스로 옮기기
  get amount() {
    // amount() 함수는 각각의 서브클래스로 로직을 이동해서 오버라이드 시키므로, 슈퍼클래스의 로직이 실행될 일은 없음.
    // 그러나, 이 내용을 슈퍼클래스 안에 명시적으로 남겨두기 위해 아래와 같이 throw new Error() 를 작성해둔 것.
    throw new Error("서브클래스에서 처리하도록 설계되었습니다.");
  }

  // volumeCreditsFor() 함수 계산기 클래스로 옮기기
  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0); // 적립금 계산 로직이 다른 희극을 제외한 나머지 장르의 적립금 계산 로직만 슈퍼클래스에 남겨둠.
  }
}

// 다형성 지원을 위한 팩토리 함수
function createPerformanceCalculator(aPerformance, aPlay) {
  switch (aPlay.type) {
    case "tragedy":
      return new TragedyCalculator(aPerformance, aPlay);
    case "comedy":
      return new ComedyCalculator(aPerformance, aPlay);
    default:
      throw new Error(`알 수 없는 장르: ${aPlay.type}`);
  }
}

class TragedyCalculator extends PerformanceCalculator {
  // amount 메서드를 서브클래스에 정의하기만 해도 슈퍼클래스의 amount 메서드의 로직이 오버라이드됨.
  get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}
class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }

  get volumeCredits() {
    // 희극 장르의 적립금 계산 로직이 다르므로, 슈퍼클래스에서 계산된 적립금을 상속받아 추가 계산을 처리하는 로직을 내려줌.
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
}

// 중간데이터 생성 전담 함수 추출
export default function createStatementData(invoice, plays) {
  const result = {}; // 중간 데이터 구조를 만들어서 인수로 전달
  result.customer = invoice.customer; // 고객 데이터를 중간 데이터로 옮겨서 전달
  result.performances = invoice.performances.map(enrichPerformance); // 공연객체 데이터 얕은 복사하여 전달 (원본 데이터 불변성 유지)
  result.totalAmount = totalAmount(result); // 총합 구하는 부분을 옮김
  result.totalVolumeCredits = totalVolumeCredits(result); // 총합 구하는 부분 옮김
  return result;

  // 중간 데이터로 넘기는 공연객체에 연극 정보를 추가하여 전달
  function enrichPerformance(aPerformance) {
    const calculator = createPerformanceCalculator(
      aPerformance,
      playFor(aPerformance)
    ); // 생성자를 패토리 함수로 바꾸기
    const result = Object.assign({}, aPerformance); // 얕은 복사 수행
    result.play = calculator.play; // 함수 선언 바꾸기
    result.amount = calculator.amount; // 함수를 인라인
    result.volumeCredits = calculator.volumeCredits; // 함수를 인라인
    return result;
  }

  // renderPlainText() 의 중첩함수였던 playFor() 를 statement() 로 옮김
  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  // totalAmount 함수 추출 (동일 이름의 변수가 있어서 일단 임의의 함수 이름 작성)
  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0); // 반복문을 파이프라인으로 바꿈 (누산값을 계산하는 reduce 배열 메서드 사용)
  }

  // 포인트 적립 누적계산 함수 추출
  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0); // 반복문을 파이프라이으로 바꿈
  }
}
