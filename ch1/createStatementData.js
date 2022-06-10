"use strict";

// 조건부 로직을 다형성으로 바꾸기 위해 상속 계층 클래스 생성 (공연 관련 데이터 계산하는 함수들로 구성)
class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  // amountFor() 함수 계산기 클래스로 옮기기
  get amount() {
    // 불필요한 매개변수 삭제
    let result = 0; // 변수를 명확한 이름으로 변경함.

    switch (
      this.play.type // playFor() 대신 중간데이터를 사용하도록 대체
    ) {
      case "tragedy": // 비극
        result = 40000;
        if (this.performance.audience > 30) {
          result += 1000 * (this.performance.audience - 30);
        }
        break;
      case "comedy": // 희극
        result = 30000;
        if (this.performance.audience > 20) {
          result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${this.play.type}`); // 변수 인라인
    }

    return result; // 함수의 반환 값은 가급적 'result' 라는 이름으로 변수명을 지을 것.
  }

  // volumeCreditsFor() 함수 계산기 클래스로 옮기기
  get volumeCredits() {
    let result = 0; // 추출된 함수를 돌때마다 volumeCredits 복제본 초기화
    result += Math.max(this.performance.audience - 30, 0);
    if ("comedy" === this.play.type)
      result += Math.floor(this.performance.audience / 5);

    return result; // 반환값 변수명은 가급적 'result'
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

class TragedyCalculator extends PerformanceCalculator {}
class ComedyCalculator extends PerformanceCalculator {}

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
