// 원래 함수 호출 코드
const found = alertForMiscreant(people);

// 원본함수 복사 후, 질의 목적에 맞게 반환값 변수의 이름을 참조하여 함수 이름 짓기
function findMisreant(people) {
  for (const p of people) {
    if (p === "조커") {
      return "조커";
    }
    if (p === "사루만") {
      return "사루만";
    }
  }
  return "";
}

function alertForMiscreant(people) {
  for (const p of people) {
    if (p === "조커") {
      setOffAlarms();
      return "조커";
    }
    if (p === "사루만") {
      setOffAlarms();
      return "사루만";
    }
  }
  return "";
}
