"use strict";

// readFileSync 를 이용해서 동기적으로 JSON 데이터를 가져온 뒤, 파싱함.
const fs = require("fs");
const invoice = JSON.parse(fs.readFileSync("./invoices.json", "utf8"));
const plays = JSON.parse(fs.readFileSync("./plays.json", "utf8"));

// node.js 에서 모듈 파일 import 시 아래와 같이 해줄 것
const { createStatementData } = require("./createStatementData");

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays)); // 본문(내부 코드) 전체를 별도 함수로 추출
}

// 본문(내부 코드) 전체를 별도 함수로 추출
// 중간 데이터 구조를 인수로 전달받음
function renderPlainText(data) {
  let result = `청구 내역 (고객명: ${data.customer})\n`; // 고객 데이터를 중간 데이터로부터 얻음

  // 공연 정보를 중간 데이터로부터 얻음
  for (let perf of data.performances) {
    // 청구 내역을 출력한다.
    // playFor() 대신 중간데이터를 사용하도록 대체
    // amountFor() 대신 중간데이터를 사용하도록 대체
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${
      // thisAmount 변수 인라인
      perf.audience
    }석)\n`;
  }

  result += `총액: ${usd(data.totalAmount)}\n`; // totalAmount() 대신 중간데이터 사용
  result += `적립 포인트: ${data.totalVolumeCredits}점\n`; // totalVolumeCredits() 대신 중간데이터 사용
  return result;

  // format 함수를 저장한 함수변수인 임시변수 format을 실제 함수로 추출하고, 화폐단위를 달러로 변환하는 기능에 맞게 이름을 usd 로 변경함.
  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100); // amountFor() 에서 센트 단위 정수로 계산해주는 금액을 100으로 나눠서 달러 단위로 변환하는 작업까지 추출함수 내에서 처리함.
  }
}

// 터미널에 'node app.js' 를 입력해서 app.js 를 Node.js 로 실행하면, 터미널에 리턴값인 result를 출력함.
// 참고로, refactoring 디렉토리에서 작업중이라면, 'cd ch1' 으로 디렉토리를 변경해야 app.js 실행이 가능할 것임.
console.log(statement(invoice, plays));
