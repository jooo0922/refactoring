"use strict";

// readFileSync 를 이용해서 동기적으로 JSON 데이터를 가져온 뒤, 파싱함.
const fs = require("fs");
const invoice = JSON.parse(fs.readFileSync("./invoices.json", "utf8"));
const plays = JSON.parse(fs.readFileSync("./plays.json", "utf8"));

function statement(invoice, plays) {
  const statementData = {}; // 중간 데이터 구조를 만들어서 인수로 전달
  statementData.customer = invoice.customer; // 고객 데이터를 중간 데이터로 옮겨서 전달
  statementData.performances = invoice.performances; // 공연 정보를 중간 데이터로 옮겨서 전달
  return renderPlainText(statementData, plays); // 본문(내부 코드) 전체를 별도 함수로 추출
}

// 본문(내부 코드) 전체를 별도 함수로 추출
// 중간 데이터 구조를 인수로 전달받음
function renderPlainText(data, plays) {
  let result = `청구 내역 (고객명: ${data.customer})\n`; // 고객 데이터를 중간 데이터로부터 얻음

  // 공연 정보를 중간 데이터로부터 얻음
  for (let perf of data.performances) {
    // 청구 내역을 출력한다.
    // 변수 인라인
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${
      // thisAmount 변수 인라인
      perf.audience
    }석)\n`;
  }

  result += `총액: ${usd(totalAmount())}\n`; // totalAmount 변수 인라인하여 제거
  result += `적립 포인트: ${totalVolumeCredits()}점\n`; // volumeCredits 변수 인라인하여 제거
  return result;

  // totalAmount 함수 추출 (동일 이름의 변수가 있어서 일단 임의의 함수 이름 작성)
  function totalAmount() {
    let result = 0; // 문장 슬라이드하기 (변수 선언을 반복문 앞으로 이동)
    // 반복문 쪼개기
    // 공연 정보를 중간 데이터로부터 얻음
    for (let perf of data.performances) {
      result += amountFor(perf); // thisAmount 변수 인라인
    }
    return result; // 반환값 변수명은 가급적 'result'
  }

  // 포인트 적립 누적계산 함수 추출
  function totalVolumeCredits() {
    let result = 0; // 문장 슬라이드하기(변수 선언을 반복문 앞으로 이동)
    // 반복문 쪼개기
    // 공연 정보를 중간 데이터로부터 얻음
    for (let perf of data.performances) {
      result += volumeCreditsFor(perf); // 추출한 함수를 이용해 값을 누적
    }
    return result; // 반환값 변수명은 가급적 'result'
  }

  // format 함수를 저장한 함수변수인 임시변수 format을 실제 함수로 추출하고, 화폐단위를 달러로 변환하는 기능에 맞게 이름을 usd 로 변경함.
  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100); // amountFor() 에서 센트 단위 정수로 계산해주는 금액을 100으로 나눠서 달러 단위로 변환하는 작업까지 추출함수 내에서 처리함.
  }

  // 적립 포인트 누적 계산 함수 추출
  // 매개변수 이름 변경 (타입이 드러나도록)
  function volumeCreditsFor(aPerformance) {
    let result = 0; // 추출된 함수를 돌때마다 volumeCredits 복제본 초기화
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === playFor(aPerformance).type)
      result += Math.floor(aPerformance.audience / 5);

    return result; // 반환값 변수명은 가급적 'result'
  }

  // play 는 perf(aPerformance) 안에서 받아오는 값이라 애초에 매개변수로 넘겨줄 필요가 없었음.
  // 이런 임시변수들은 질의함수로 바꿔줌.
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
      playFor(aPerformance).type // 변수 인라인
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
}

// 터미널에 'node app.js' 를 입력해서 app.js 를 Node.js 로 실행하면, 터미널에 리턴값인 result를 출력함.
// 참고로, refactoring 디렉토리에서 작업중이라면, 'cd ch1' 으로 디렉토리를 변경해야 app.js 실행이 가능할 것임.
console.log(statement(invoice, plays));
