"use strict";

// readFileSync 를 이용해서 동기적으로 JSON 데이터를 가져온 뒤, 파싱함.
const fs = require("fs");
const invoice = JSON.parse(fs.readFileSync("./invoices.json", "utf8"));
const plays = JSON.parse(fs.readFileSync("./plays.json", "utf8"));

function statement(invoice, plays) {
  // play 는 perf(aPerformance) 안에서 받아오는 값이라 애초에 매개변수로 넘겨줄 필요가 없었음.
  // 이런 임시변수들은 질의함수로 바꿔줌.
  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  // 함수 추출하기
  // 새 함수 안에서 값을 변경하지 않는 변수는 매개변수로 전달
  // 자바스크립트같은 동적타입언어는 변수명을 지정할 때 타입이 드러나도록 하는 게 좋음. (하나의 performance 객체라는 것을 표현하기 위해 부정관사 a 를 접두어로 붙임.)
  function amountFor(aPerformance, play) {
    let result = 0; // 변수를 명확한 이름으로 변경함.

    switch (play.type) {
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
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }

    return result; // 함수의 반환 값은 가급적 'result' 라는 이름으로 변수명을 지을 것.
  }

  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.performances) {
    let thisAmount = amountFor(perf, playFor(perf)); // 추출한 함수 이용, 변수 인라인

    // 포인트를 적립한다.
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if ("comedy" === playFor(perf).type)
      volumeCredits += Math.floor(perf.audience / 5); // 변수 인라인

    // 청구 내역을 출력한다.
    // 변수 인라인
    result += ` ${playFor(perf).name}: ${format(thisAmount / 100)} (${
      perf.audience
    }석)\n`;
    totalAmount += thisAmount;
  }
  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}

// 터미널에 'node app.js' 를 입력해서 app.js 를 Node.js 로 실행하면, 터미널에 리턴값인 result를 출력함.
// 참고로, refactoring 디렉토리에서 작업중이라면, 'cd ch1' 으로 디렉토리를 변경해야 app.js 실행이 가능할 것임.
console.log(statement(invoice, plays));
