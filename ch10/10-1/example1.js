charge = summer() ? summerCharge() : regularCharge(); // 전체 조건문을 삼항연산자로 변경

function regularCharge() {
  return quantity * plan.regularRate + plan.regularServiceCharge;
}

function summerCharge() {
  return quantity * plan.summerRate;
}

function summer() {
  return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
}
