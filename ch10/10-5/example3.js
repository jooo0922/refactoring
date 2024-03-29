let _ = require("lodash"); // lodash 패키지를 가져온다. (cloneDeep() 메서드를 사용하기 위함)

// 클라이언트 1
const rawSite = acquireSiteData();
const site = enrichSite(rawSite);
const aCustomer = site.customer;
// ... 수많은 코드 ...
let customerName = aCustomer.name; // 특이 케이스 객체 레코드에도 name 속성이 보강(enrich)되었으므로, 이를 사용할 것.

// 클라이언트 2
const plan = aCustomer.billingPlan; // 특이 케이스 객체 레코드에도 billingPlan 속성이 보강(enrich)되었으므로, 이를 사용할 것.

// 클라이언트 3
const weeksDeliquent = aCustomer.paymentHistory.weeksDeliquentInLastYear; // 특이 케이스 객체 레코드에도 paymentHistory 속성이 보강(enrich)되었으므로, 이를 사용할 것.

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

// 현장 데이터 구조를 변환하는 함수
// 변환함수 중에서 부가 정보만 덧붙이는 변환함수는 'enrich' 라고 이름붙이고,
// 형태나 구조 자체를 바꿀 때에는 'transform' 이라고 이름붙인다
function enrichSite(inputSite) {
  const result = _.cloneDeep(inputSite);
  const unknownCustomer = {
    isUnknown: true,
    name: "거주자", // 특이 케이스에 name 속성 보강
    billingPlan: registry.billingPlans.basic, // 특이 케이스에 billingPlan 속성 보강
    paymentHistory: {
      weeksDeliquentInLastYear: 0, // 특이 케이스에 paymentHistory 속성 보강
    },
  };

  // 기존 site 데이터 구조에 isUnknown 속성을 덧붙인다(enrich)
  if (isUnknown(result.customer)) result.customer = unknownCustomer;
  else result.customer.isUnknown = false;
  return result;
}

// 특이 케이스 검사 함수 추출
function isUnknown(aCustomer) {
  if (aCustomer === "미확인 고객")
    return true; // 기존 검사 로직 유지 (rawSite 검사용 -> enrichSite() 함수에서 rawSite 데이터를 가지고 특이 케이스 여부를 검사하기 때문에 남겨둬야 함.)
  else return aCustomer.isUnknown; // 보강된 속성값으로 검사하는 로직 추가 (enrich site 검사용)
}
