function reportLines(aCustomer) {
  const lines = [];
  lines.push(["name", aCustomer.name]);
  lines.push(["location", aCustomer.location]); // 여러 문장을 호출한 곳으로 옮기기
  gatherCustomerData(lines, aCustomer);
  return lines;
}
