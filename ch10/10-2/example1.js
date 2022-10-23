function disablilityAmount(anEmployee) {
  if (
    anEmployee.seniority < 2 ||
    anEmployee.monthDisabled > 12 ||
    anEmployee.isPartTime
  )
    return 0;
  // 장애 수당 계산
}
