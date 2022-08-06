function acquireReading() {
  return {
    customer: "ivan",
    quantity: 10,
    month: 5,
    year: 2017,
  };
}

function baseRate(month, year) {
  // 임시로 작성한 함수
  return 0.5;
}

function taxThreshold(year) {
  // 임시로 작성한 함수
  return 1;
}

// 재귀함수를 이용해 객체를 깊은 복사하여 반환하는 함수
function cloneDeep(obj) {
  const result = {};

  for (let key in obj) {
    if (typeof obj[key] === "object") {
      result[key] = copyObj(obj[key]);
    } else {
      result[key] = obj[key];
    }
  }

  return result;
}

// 클라이언트 1...
{
  const rawReading = acquireReading();
  const aReading = enrichReading(rawReading); // 미가공 측정값을 계산로직에 전달하기 전, 부가정보를 덧붙이도록 수정함
  const baseCharge = aReading.baseCharge; // 클라이언트 1도 부가정보가 담긴 필드를 사용하도록 수정함
}

// 클라이언트 2...
{
  const aReading = acquireReading();
  const base = baseRate(aReading.month, aReading.year) * aReading.quantity;
  const texableCharge = Math.max(0, base - taxThreshold(aReading.year));
}

// 클라이언트 3...
{
  const rawReading = acquireReading();
  const aReading = enrichReading(rawReading); // 미가공 측정값을 계산로직에 전달하기 전, 부가정보를 덧붙이도록 수정함
  const basicChargeAmount = aReading.baseCharge; // 클라이언트가 부가정보가 담긴 필드를 사용하도록 수정함
}

function calculateBaseCharge(aReading) {
  // 프로그램 곳곳에서 중복된 로직들이 사용되고 있음.
  return baseRate(aReading.month, aReading.year) * aReading.quantity;
}

// 먼저 입력 객체를 그대로 깊은 복사하여 반환하는 변환함수 만듦.
function enrichReading(original) {
  const result = cloneDeep(original);
  result.baseCharge = calculateBaseCharge(result); // 계산로직의 출력값을 부가정보로 덧붙임
  return result;
}
