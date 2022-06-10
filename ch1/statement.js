"use strict";

import invoice from "./invoices.json" assert { type: "json" }; // JSON 모듈 제안
import plays from "./plays.json" assert { type: "json" }; // JSON 모듈 제안
import createStatementData from "./createStatementData.js";

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
}

function htmlStatement(invoice, plays) {
  return renderHtml(createStatementData(invoice, plays)); // 중간데이터 생성 함수 공유
}

function renderHtml(data) {
  let result = `<h1>청구 내역 (고객명: ${data.customer})</h1>\n`;
  result += "<table>\n";
  result += "<tr><th>연극</th><<th>좌석 수</th><<th>금액</th></tr>";
  for (let perf of data.performances) {
    result += `<tr><td>${perf.play.name}</td><td>(${perf.audience}석)</td>`;
    result += `<td>${usd(perf.amount)}</td></tr>\n`;
  }
  result += "</table>\n";
  result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>적립 포인트: <em>${data.totalVolumeCredits}</em>점</p>\n`;
  return result;
}

// usd() 를 renderHtml() 에서도 사용할 수 있도록 최상위 블록으로 옮김
function usd(aNumber) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber / 100); // amountFor() 에서 센트 단위 정수로 계산해주는 금액을 100으로 나눠서 달러 단위로 변환하는 작업까지 추출함수 내에서 처리함.
}

// 터미널에 'node app.js' 를 입력해서 app.js 를 Node.js 로 실행하면, 터미널에 리턴값인 result를 출력함.
// 참고로, refactoring 디렉토리에서 작업중이라면, 'cd ch1' 으로 디렉토리를 변경해야 app.js 실행이 가능할 것임.
console.log(statement(invoice, plays));
document.body.innerHTML = htmlStatement(invoice, plays);
