function priceOrder(product, quantity, shippingMethod) {
  const priceData = calculatePricingData(product, quantity);
  const price = applyShipping(priceData, shippingMethod); // 중간 데이터 구조를 두 번째 단계 함수의 인수로 추가
  return price;
}

// 첫 번째 단계(상품 가격 계산 코드) 함수로 추출
function calculatePricingData(product, quantity) {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;
  // 첫 번째 단계에서 사용되는 매개변수들은 원본 훼손 방지를 위해 중간데이터 객체에 복사하여 두 번째 단계 함수로 전달함.
  const priceData = {
    basePrice: basePrice,
    quantity: quantity,
    discount: discount,
  }; // 중간 데이터 구조
  return priceData; // 중간 데이터 구조 반환
}

// 두 번째 단계(배송비 계산 코드) 함수로 추출
function applyShipping(priceData, shippingMethod) {
  const shippingPerCase =
    priceData.basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountedFee
      : shippingMethod.feePerCase;
  const shippingCost = priceData.quantity * shippingPerCase;
  const price = priceData.basePrice - priceData.discount + shippingCost;
  return price;
}
