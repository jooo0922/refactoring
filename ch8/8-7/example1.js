return `최연소: ${youngestAge()}, 총 급여: ${totalSalary()}`;

function youngestAge() {
  let youngest = people[0] ? people[0].age : Infinity;
  for (const p of people) {
    if (p.age < youngest) youngest = p.age; // 부수효과가 있는 코드는 한쪽만 남기고 제거
  }
  return youngest;
}

function totalSalary() {
  let totalSalary = 0;
  for (const p of people) {
    totalSalary += p.salary; // 부수효과가 있는 코드는 한쪽만 남기고 제거
  }
  return totalSalary;
}
