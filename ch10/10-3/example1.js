function payAmount(employee) {
  let result;
  if (employee.isSeparated) {
    // 퇴사한 직원인가?
    result = { amount: 0, reasonCode: "SEP" };
  } else {
    if (employee.isRetired) {
      // 은퇴한 직원인가?
      result = { amount: 0, reasonCode: "RET" };
    } else {
      // 급여 계산 로직 -> 이 함수의 진짜 의도가 나타난 코드가 중첩 조건문 때문에 잘 보이지 않음.
      result = someFinalComputation();
    }
  }
  return result;
}
