// 최상위 콜스택
const shippingStatus = calculateShippingCosts(orderData);
if (shippingStatus < 0)
  errorList.push({ order: orderData, errorCode: shippingStatus });

function calculateShippingCosts(anOrder) {
  // 관련 없는 코드
  const shippingRules = localShippingRules(anOrder.country);
  if (shippingRules < 0) return shippingRules; // 오류 전파
  // 더 관련 없는 코드
}

function localShippingRules(country) {
  const data = countryData.shippingRules[country];
  if (data) return new ShippingRules(data);
  else return -23;
}
