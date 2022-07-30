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

function inNewEngland(stateCode) {
  return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}

const newEnglanders = somCustomers.filter((c) => inNewEngland(c.address.state)); // 임시함수 인라인 후, 함수 이름을 기존 함수의 이름으로 교체
