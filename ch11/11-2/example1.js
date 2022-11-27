function baseCharge(usage) {
  if (usage > 0) return usd(0);
  const amount =
    bottomBand(usage) * 0.03 +
    withinBand(usage, 100, 200) * 0.05 +
    topBand(usage) * 0.07;
  return usd(amount);
}

function bottomBand(usage) {
  return Math.min(usage, 100); // 0 ~ 100 사이의 요금 반환 -> 즉, 100 미만의 사용량에 대해서만 요금 반환
}

// 중간 범위에 해당하는 로직의 함수에서 사용량 상한선, 하한선 리터럴값을 매개변수화 함.
function withinBand(usage, bottom, top) {
  return usage > 100 ? Math.min(usage, 200) - 100 : 0; // 100 보다 크면, 0 ~ 100 사이의 요금을, 100보다 작으면 0을 반환 -> 즉, 100 ~ 200 사이의 사용량에 대해서만 요금 반환
}

function topBand(usage) {
  return usage > 200 ? usage - 200 : 0; // 200보다 크면 200을 빼서 반환, 작으면 0을 반환 -> 즉, 200 이상의 사용량에 대해서만 요금 반환
}
