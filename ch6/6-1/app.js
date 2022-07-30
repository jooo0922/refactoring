function printOwing(invoice) {
  printBanner(); // 배너 출력 로직을 함수로 추출

  // 미해결 채무(outstanding)를 계산한다.
  let outstanding = 0; // 맨 위에 있던 선언문을 이 위치로 이동 (문장 슬라이드하기. 연관된 코드들을 비슷한 위치에 모아두는 것!)
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }

  // 마감일(dueDate)을 기록한다.
  recordDueDate(invoice); // 마감일 설정 로직을 함수로 추출

  // 세부사항을 출력한다.
  printDetails(invoice, outstanding); // 앞의 예와 달리 지역변수를 매개변수로 전달
}

function calculateOutstanding(invoice) {
  // 추출할 코드 새 함수에 복사
  let outstanding = 0;
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }
  return outstanding; // 수정된 값 반환
}

function recordDueDate(invoice) {
  const today = Clock.today;
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30
  );
}

function printDetails(invoice, outstanding) {
  console.log(`고객명: ${invoice.customer}`);
  console.log(`채무액: ${outstanding}`);
  console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
}

function printBanner() {
  console.log("******************");
  console.log("**** 고객 채무 ****");
  console.log("******************");
}
