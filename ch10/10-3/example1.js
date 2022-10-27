function payAmount(employee) {
  let result;
  if (employee.isSeparated) return { amount: 0, reasonCode: "SEP" }; // 맨 바깥쪽 조건문을 보호구문으로 변경
  if (employee.isRetired) return { amount: 0, reasonCode: "RET" };
  // 급여 계산 로직 -> 이 함수의 진짜 의도가 나타난 코드가 중첩 조건문 때문에 잘 보이지 않음.
  result = someFinalComputation();
  return result;
}
