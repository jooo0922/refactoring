return `최연소: ${youngestAge()}, 총 급여: ${totalSalary()}`;

function youngestAge() {
  return Math.min(...people.map((p) => p.age)); // 반복문 -> 컬렉션 파이프라인으로 변경 -> 알고리즘 교체하기
}

function totalSalary() {
  return people.reduce((total, p) => total + p.salary, 0); // 반복문 -> 컬렉션 파이프라인으로 변경
}
