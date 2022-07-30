// 함수 이름을 너무 축약한 경우, 간단한 절차로 함수 선언문과 호출문을 모두 찾아 이름을 바꿈.
// function circumference(radius) {
//   return 2 * Math.PI * radius;
// }

// 기존 함수 제거
// function circum(radius) {
//   return circumference(radius);
// }

function circumference(radius) {
  return 2 * Math.PI * radius;
}

const circumference = circumference(5); // 예전 함수를 본문의 추출한 함수를 호출하는 코드로 인라인함.
