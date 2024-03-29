function baseCharge(usage) {
  if (usage > 0) return usd(0);
  const amount =
    withinBand(usage, 0, 100) * 0.03 +
    withinBand(usage, 100, 200) * 0.05 +
    withinBand(usage, 200, Infinity) * 0.07;
  return usd(amount);
}

// 중간 범위에 해당하는 로직의 함수에서 사용량 상한선, 하한선 리터럴값을 매개변수화 함.
function withinBand(usage, bottom, top) {
  return usage > bottom ? Math.min(usage, top) - bottom : 0; // 100 보다 크면, 0 ~ 100 사이의 요금을, 100보다 작으면 0을 반환 -> 즉, 100 ~ 200 사이의 사용량에 대해서만 요금 반환
}
