function discount(inputValue, quantity) {
  let result = inputValue; // 1. 함수에 데이터를 전달하는 용도, 2. 결과값을 반환하는 용도 로 매개변수를 쪼개줌
  if (inputValue > 50) result = result - 2;
  if (quantity > 100) result = result - 1;
  return result;
}
