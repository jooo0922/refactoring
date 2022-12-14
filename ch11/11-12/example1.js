// 예외 서브클래스 (오류를 처리할 예외와 기타 예외를 구분하기 위한 클래스)
class OrderProcessingError extends Error {
  constructor(errorCode) {
    super(`주문 처리 오류: ${errorCode}`);
    this.code = errorCode;
  }
  get name() {
    return "OrderProcessingError";
  }
}

// 최상위 콜스택
let shippingStatus;
try {
  shippingStatus = calculateShippingCosts(orderData);
} catch (e) {
  // 예외 처리 로직
  if (e instanceof OrderProcessingError) {
    errorList.push({ order: orderData, errorCode: e.code }); // 예외처리 시 처리하고자 하는 로직
  } else {
    throw e; // 그밖의 예외처리 로직
  }
}

function calculateShippingCosts(anOrder) {
  // 관련 없는 코드
  const shippingRules = localShippingRules(anOrder.country);
  // 더 관련 없는 코드
}

function localShippingRules(country) {
  const data = countryData.shippingRules[country];
  if (data) return new ShippingRules(data);
  else throw new OrderProcessingError(-23);
}
