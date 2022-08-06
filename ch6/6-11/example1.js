function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;
  const priceData = {}; // 중간 데이터 구조
  const price = applyShipping(
    priceData, // 중간 데이터 구조를 두 번째 단계 함수의 인수로 추가
    basePrice,
    shippingMethod,
    quantity,
    discount
  );
  return price;
}

// 두 번째 단계(배송비 계산 코드) 함수로 추출
function applyShipping(
  priceData,
  basePrice,
  shippingMethod,
  quantity,
  discount
) {
  const shippingPerCase =
    basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountedFee
      : shippingMethod.feePerCase;
  const shippingCost = quantity * shippingPerCase;
  const price = basePrice - discount + shippingCost;
  return price;
}
