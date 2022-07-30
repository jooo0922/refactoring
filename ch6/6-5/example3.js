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
  return xxNEWinNewEngland(aCustomer.address.state); // 추출해 둔 매개변수 인라인
}

// 임시 이름을 붙여 함수 추출
function xxNEWinNewEngland(stateCode) {
  return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}

const newEnglanders = somCustomers.filter((c) => inNewEngland(c));
