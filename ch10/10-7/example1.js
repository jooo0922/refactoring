// 생략(중요하지 않은 코드)
checkForMiscreants(people);
// 생략

function checkForMiscreants(people) {
  // for...of 반복문을 배열 파이프라인 .some() 으로 변경
  if (people.some((p) => ["조커", "사루만"].includes(p))) sendAlert();
}
