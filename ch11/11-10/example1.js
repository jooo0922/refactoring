// 호출자...
monthCharge = charge(customElements, usage, provider);

// 명령 객체 생성 및 실행 호출 코드를 함수로 추출
function charge(customElements, usage, provider) {
  const baseCharge = customer.baseRate * usage;
  return baseCharge + provider.connectionCharge;
}
