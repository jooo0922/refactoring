function disablilityAmount(anEmployee) {
  if (anEmployee.seniority < 2 || anEmployee.monthDisabled > 12) return 0;
  if (anEmployee.isPartTime) return 0;
  // 장애 수당 계산
}
