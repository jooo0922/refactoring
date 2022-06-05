"use strict";

// readFileSync 를 이용해서 동기적으로 JSON 데이터를 가져온 뒤, 파싱함.
const fs = require("fs");
const invoice = JSON.parse(fs.readFileSync("./invoices.json", "utf8"));
const plays = JSON.parse(fs.readFileSync("./plays.json", "utf8"));

// 함수 추출하기
// 새 함수 안에서 값을 변경하지 않는 변수는 매개변수로 전달
function amountFor(perf, play) {
  let thisAmount = 0; // 새 함수 안에서 값이 바뀌는 변수를 초기화하는 코드

  switch (play.type) {
    case "tragedy": // 비극
      thisAmount = 40000;
      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30);
      }
      break;
    case "comedy": // 희극
      thisAmount = 30000;
      if (perf.audience > 20) {
        thisAmount += 10000 + 500 * (perf.audience - 20);
      }
      thisAmount += 300 * perf.audience;
      break;
    default:
      throw new Error(`알 수 없는 장르: ${play.type}`);
  }

  return thisAmount; // 새 함수 안에서 값이 바뀌는 변수 반환
}

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = amountFor(perf, play); //

    // 포인트를 적립한다.
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

    // 청구 내역을 출력한다.
    result += ` ${play.name}: ${format(thisAmount / 100)} (${
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
