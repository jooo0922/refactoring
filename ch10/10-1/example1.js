if (summer()) charge = summerCharge();
else charge = quantity * plan.regularRate + plan.regularServiceCharge;

function summerCharge() {
  return quantity * plan.summerRate;
}

function summer() {
  return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
}
