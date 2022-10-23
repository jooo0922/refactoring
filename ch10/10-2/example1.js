function disablilityAmount(anEmployee) {
  if (isNotEligibleForDisability(anEmployee)) return 0;
  // 장애 수당 계산
}
function isNotEligibleForDisability(anEmployee) {
  // 장애 수단 적용여부 확인
  return (
    anEmployee.seniority < 2 ||
    anEmployee.monthDisabled > 12 ||
    anEmployee.isPartTime
  );
}
