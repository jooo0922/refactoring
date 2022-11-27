// 배송일자 계산 호출 코드 1
aShipment.deliveryDate = rushDeliveryData(anOrder);

// 배송일자 계산 호출 코드 2
aShipment.deliveryDate = regularDeliveryDate(anOrder);

// 플래그 인수 사용 함수가 너무 복잡해서 손댈 엄둑가 안난다면, 불리언 값에 따라 각각 래핑함수로 감싸버림.
function rushDeliveryData(anOrder) {
  return deliveryDate(anOrder, true);
}

function regularDeliveryDate(anOrder) {
  return deliveryDate(anOrder, false);
}

// 플래그 인수를 너무 복잡하게 사용하는 함수
function deliveryDate(anOrder, isRush) {
  let result;
  let deliveryTime;
  if (anOrder.deliveryState === "MA" || anOrder.deliveryState === "CT")
    deliveryTime = isRush ? 1 : 2;
  else if (anOrder.deliveryState === "NY" || anOrder.deliveryState === "NH") {
    deliveryTime = 2;
    if (anOrder.deliveryState === "NH" && !isRush) deliveryTime = 3;
  } else if (isRush) deliveryTime = 3;
  else if (anOrder.deliveryState === "ME") deliveryTime = 3;
  else deliveryTime = 4;
  result = anOrder.placedOn.plusDays(2 + deliveryTime);
  if (isRush) result = result.minusDays(1);
  return result;
}
