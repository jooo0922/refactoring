function discount(originInputValue, quantity) {
  let inputValue = originInputValue; // 1. 함수에 데이터를 전달하는 용도, 2. 결과값을 반환하는 용도 로 매개변수를 쪼개줌
  if (inputValue > 50) inputValue = inputValue - 2;
  if (quantity > 100) inputValue = inputValue - 1;
  return inputValue;
}
