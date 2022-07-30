function printOwing(invoice) {
  printBanner(); // 배너 출력 로직을 함수로 추출

  // 미해결 채무(outstanding)를 계산한다.
  const outstanding = calculateOutstanding(invoice); // 함수 추출 완료. 추출한 함수가 반환한 값을 원래 변수에 저장한다.
  // 이제 outstanding 지역변수는 변경될 일이 없으므로, const 로 지정해서 불변으로 만듦.

  // 마감일(dueDate)을 기록한다.
  recordDueDate(invoice); // 마감일 설정 로직을 함수로 추출

  // 세부사항을 출력한다.
  printDetails(invoice, outstanding); // 앞의 예와 달리 지역변수를 매개변수로 전달
}

function calculateOutstanding(invoice) {
  // 추출할 코드 새 함수에 복사
  let result = 0; // 변수 이름을 내 코딩스타일에 맞게 변경
  for (const o of invoice.orders) {
    result += o.amount;
  }
  return result; // 수정된 값 반환
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
