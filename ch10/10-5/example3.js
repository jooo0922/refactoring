let _ = require("lodash"); // lodash 패키지를 가져온다. (cloneDeep() 메서드를 사용하기 위함)

// 클라이언트 1
const site = acquireSiteData();
const aCustomer = site.customer;
// ... 수많은 코드 ...
let customerName;
if (aCustomer === "미확인 고객") customerName = "거주자";
else customerName = aCustomer.name;

// 클라이언트 2
const plan =
  aCustomer === "미확인 고객"
    ? registry.billingPlan.basic
    : aCustomer.billingPlan;

// 클라이언트 3
const weeksDeliquent =
  aCustomer === "미확인 고객"
    ? 0
    : aCustomer.paymentHistory.weeksDeliquentInLastYear;

function acquireSiteData() {
  const siteData1 = {
    name: "애크미 보스턴",
    location: "Malden MA",
    // 더 많은 현장(site) 정보
    customer: {
      name: "애크미 선장",
      billingPlan: "plan-451",
      paymentHistory: {
        weeksDeliquentInLastYear: 7,
        // 중략
      },
      // 중략
    },
  };
  const siteData2 = {
    name: "물류창고 15",
    location: "Malden MA",
    // 더 많은 현장(site) 정보
    customer: "미확인 고객",
  };
  return siteData2;
}
