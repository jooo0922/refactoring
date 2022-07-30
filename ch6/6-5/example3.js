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
  return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(aCustomer.address.state);
}

const newEnglanders = somCustomers.filter((c) => inNewEngland(c));
