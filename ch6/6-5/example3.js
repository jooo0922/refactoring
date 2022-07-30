const somCustomers = [
  {
    name: "john",
    address: {
      state: "MA",
    },
  },
  {
    name: "henry",
    address: {
      state: "SS",
    },
  },
  {
    name: "bee",
    address: {
      state: "AA",
    },
  },
];

function inNewEngland(aCustomer) {
  const stateCode = aCustomer.address.state; // 매개변수로 사용할 코드를 변수로 추출
  return xxNEWinNewEngland(stateCode);
}

// 임시 이름을 붙여 함수 추출
function xxNEWinNewEngland(stateCode) {
  return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}

const newEnglanders = somCustomers.filter((c) => inNewEngland(c));
