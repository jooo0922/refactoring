const customerData = {
  1920: {
    name: "마틴 파울러",
    id: "1920",
    usage: {
      2016: {
        1: 50,
        2: 55,
        // 나머지 달(month)은 생략
      },
      2015: {
        1: 70,
        2: 63,
        // 나머지 달은 생략
      },
    },
  },
  38673: {
    name: "닐 포드",
    id: "38673",
    usage: {
      2016: {
        1: 30,
        2: 35,
        // 나머지 달(month)은 생략
      },
      2015: {
        1: 60,
        2: 43,
        // 나머지 달은 생략
      },
    },
  },
  // 다른 고객 정보도 같은 형식으로 저장된다.
};

const customerID = 1920;
const year = 2016;
const month = 1;
const amount = 40;

// 쓰기 예
getRawDataOfCustomers()[customerID].usage[year][month] = amount;

// 읽기 예
function compareUsage(customerID, laterYear, month) {
  const later = getRawDataOfCustomers()[customerID].usage[laterYear][month];
  const earlier =
    getRawDataOfCustomers()[customerID].usage[laterYear - 1][month];
  return { laterAmount: later, change: later - earlier };
}

// 변수 캡슐화를 위한 게터, 세터 함수 생성
function getRawDataOfCustomers() {
  return customerData;
}
function setRawDataOfCustomers(arg) {
  customerData = arg;
}
