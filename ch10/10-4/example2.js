// 투자 등급
function rating(voyage, history) {
  const vpf = voyageProfitFactor(voyage, history);
  const vr = vovageRisk(voyage);
  const chr = captainHistoryRisk(voyage, history);
  if (vpf * 3 > vr + chr * 2) return "A";
  else return "B";
}

// 항해 경로 위험요소
function vovageRisk(voyage) {
  let result = 1;
  if (voyage.length > 4) result += 2;
  if (voyage.length > 8) result += voyage.length - 8;
  if (["중국", "동인도"].includes(voyage.zone)) result += 4;
  return Math.max(result, 0);
}

// 선장의 항해 이력 위험요소
function captainHistoryRisk(voyage, history) {
  let result = 1;
  if (history.length < 5) result += 4;
  result += history.filter((v) => v.profit < 0).length;
  if (voyage.zone === "중국" && hasChina(history)) result -= 2;
  return Math.max(result, 0);
}

// 중국을 경유하는가?
function hasChina(history) {
  return history.some((v) => "중국" === v.zone); // Array.prototype.some() 메서드는 배열 안의 어떤 요소라도 주어진 판별 함수를 통과하는지 테스트합니다.
}

// 수익 요인 평가 함수
function voyageProfitFactor(voyage, history) {
  let result = 2;
  if (voyage.zone === "중국") result += 1;
  if (voyage.zone === "동인도") result += 1;
  if (voyage.zone === "중국" && hasChina(history)) {
    result += 3;
    if (history.length > 10) result += 1;
    if (voyage.length > 12) result += 1;
    if (voyage.length > 18) result -= 1;
  } else {
    if (history.length > 8) result += 1;
    if (voyage.length > 14) result -= 1;
  }
  return result;
}
