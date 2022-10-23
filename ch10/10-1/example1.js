if (summer()) charge = summerCharge();
else charge = regularCharge();

function regularCharge() {
  return quantity * plan.regularRate + plan.regularServiceCharge;
}

function summerCharge() {
  return quantity * plan.summerRate;
}

function summer() {
  return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
}
