const pricingPlan = retrievePricingPlan();
const baseCharge = pricingPlan.base;
let charge;
const chargePerUnit = pricingPlan.unit;
const order = retrieveOrder();
const units = order.units; // order 변수 선언 및 할당 문장 슬라이드
charge = baseCharge + units * chargePerUnit;
let discountableUnits = Math.max(units - pricingPlan.discountThreshold, 0);
let discount; // 할인 관련 코드를 한데 모으기 위해 discount 변수 선언 슬라이드
discount = discountableUnits * pricingPlan.discountFactor;
if (order.isRepeat) discount += 20;
charge = charge - discount;
chargeOrder(charge);
