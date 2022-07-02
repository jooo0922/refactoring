import { Producer } from "./Producer.js";

// Province 클래스 생성자의 인수로 쓸 JSON 데이터를 생성하는 함수
export function sampleProvinceData() {
  return {
    name: "Asia",
    producers: [
      { name: "Byzantium", cost: 10, production: 9 },
      { name: "Attalia", cost: 12, production: 10 },
      { name: "Sinope", cost: 10, production: 6 },
    ],
    demand: 30,
    price: 20,
  };
}

// JSON 데이터로부터 지역 정보를 읽어오는 클래스
export class Province {
  constructor(doc) {
    this._name = doc.name;
    this._producers = [];
    this._totalProduction = 0;
    this._demand = doc.demand;
    this._price = doc.price;
    doc.producers.forEach((d) => this.addProducer(new Producer(this, d)));
  }

  addProducer(arg) {
    this._producers.push(arg);
    this._totalProduction += arg.production;
  }

  // Province 클래스 데이터에 대한 접근자들
  get name() {
    return this._name;
  }
  get producers() {
    return this._producers.slice();
  }
  get totalProduction() {
    return this._totalProduction;
  }
  set totalProduction(arg) {
    this._totalProduction = arg;
  }
  get demand() {
    return this._demand;
  }
  set demand(arg) {
    this._demand = parseInt(arg); // 숫자로 파싱해서 저장 (UI에서 입력받은 숫자는 문자열로 전달되기 때문)
  }
  get price() {
    return this._price;
  }
  set price(arg) {
    this._price = parseInt(arg); // 숫자로 파싱해서 저장
  }

  // 생산 부족분을 계산하는 코드
  get shortfall() {
    return this._demand - this._totalProduction;
  }

  // 수익을 계산하는 코드
  get profit() {
    return this.demandValue - this.demandCost;
  }

  get demandValue() {
    return this.satisfiedDemand * this.price;
  }
  get satisfiedDemand() {
    return Math.min(this._demand, this.totalProduction);
  }

  get demandCost() {
    let remainingDemand = this.demand;
    let result = 0;
    this.producers
      .sort((a, b) => a.cost - b.cost)
      .forEach((p) => {
        const contribution = Math.min(remainingDemand, p.production);
        remainingDemand -= contribution;
        result += contribution * p.cost;
      });
    return result;
  }
}

/**
 * node.js 로 실행할 때,
 * import 및 export 키워드를 사용해서 ES 모듈을 load 하려면,
 *
 * package.json 에
 * "type": "module"
 *
 * 로 지정해주면 됨.
 */
