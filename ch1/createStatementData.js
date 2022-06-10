"use strict";

// 조건부 로직을 다형성으로 바꾸기 위해 상속 계층 클래스 생성 (공연 관련 데이터 계산하는 함수들로 구성)
class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
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
    const calculator = new PerformanceCalculator(
      aPerformance,
      playFor(aPerformance) // 공연 정보를 계산기로 전달
    ); // 공연료 계산기 생성
    const result = Object.assign({}, aPerformance); // 얕은 복사 수행
    result.play = calculator.play; // 함수 선언 바꾸기
    result.amount = amountFor(result); // 중간 데이터에 가격 데이터 저장
    result.volumeCredits = volumeCreditsFor(result); // 중간 데이터에 적립 포인트 저장
    return result;
  }

  // renderPlainText() 의 중첩함수였던 playFor() 를 statement() 로 옮김
  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  // 함수 추출하기
  // 새 함수 안에서 값을 변경하지 않는 변수는 매개변수로 전달
  // 자바스크립트같은 동적타입언어는 변수명을 지정할 때 타입이 드러나도록 하는 게 좋음. (하나의 performance 객체라는 것을 표현하기 위해 부정관사 a 를 접두어로 붙임.)
  function amountFor(aPerformance) {
    // 불필요한 매개변수 삭제
    let result = 0; // 변수를 명확한 이름으로 변경함.

    switch (
      aPerformance.play.type // playFor() 대신 중간데이터를 사용하도록 대체
    ) {
      case "tragedy": // 비극
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy": // 희극
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`); // 변수 인라인
    }

    return result; // 함수의 반환 값은 가급적 'result' 라는 이름으로 변수명을 지을 것.
  }

  // 적립 포인트 누적 계산 함수 추출
  function volumeCreditsFor(aPerformance) {
    let result = 0; // 추출된 함수를 돌때마다 volumeCredits 복제본 초기화
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === aPerformance.play.type)
      result += Math.floor(aPerformance.audience / 5);

    return result; // 반환값 변수명은 가급적 'result'
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
