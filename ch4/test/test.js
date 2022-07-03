/**
 * package.json 에서 "type": "module" 로 지정해놨으므로,
 * import 키워드를 통해 node.js 에서 기본적으로 제공하는 assert 모듈과
 * 테스트를 원하는 코드를 가져올 수 있음.
 */
import { assert, expect } from "chai";
import { Province, sampleProvinceData } from "../Province.js";

describe("province", function () {
  // 중복되는 픽스처 설정 코드를 단위테스트 바깥 블록으로 빼는 식으로 중복을 제거하면 절대 안됨!
  // why? const 변수에 저장되는 값은 원시값이 아닌 객체(인스턴스)이므로, 실제 값이 아닌 '레퍼런스'가 저장되어 있음.
  // 따라서, 특정 단위테스트 코드에서 const 변수의 값을 수정하면 다른 단위테스트가 영향을 받아 테스트가 제대로 작동하지 않을 수 있음!
  // const asia = new Province(sampleProvinceData());

  // 대신 beforeEach() 구문을 사용해서, 각각의 단위테스트를 실행하기 전에 asia 변수를 초기화해서
  // 모든 단위테스트가 자신만의 새로운 asia 변수를 사용하도록 함. -> 이렇게 하면 픽스처를 단위테스트마다 독립적으로 구성할 수 있음.
  let asia;
  beforeEach(function () {
    // beforeEach() 에 인자로 넣는 콜백함수는 각 단위테스트 바로 직전에 실행됨.
    // 이런 식으로 beforeEach() 함수 내에서 설정하는 픽스처를 '표준 픽스처' 라고 함.
    // -> 즉, describe 블록 안의 모든 단위테스트는 모두 똑같은 기준 데이터(픽스처)로부터 시작한다는 뜻임.
    asia = new Province(sampleProvinceData()); // 픽스처 설정
  });

  // 생산 부족분 계산로직 단위테스트 작성
  it("shortfall", function () {
    // assert.equal(asia.shortfall, 5); // 검증
    expect(asia.shortfall).equal(5); // expect() 함수로 검증
  });

  // 총 수익 계산로직 단위테스트 설정
  it("profit", function () {
    expect(asia.profit).equal(230);
  });

  // totalProduction 값 변경 후 부족분과 총 수익 계산 단위테스트 설정
  it("change production", function () {
    asia.producers[0].production = 20; // 사용자가 단위테스트에서 직접 픽스처를 수정하는 경우도 많음. ('실행' 단계)

    // '검증' 단계 (아래 코드와 달리 일반적으로 검증은 단위테스트 하나 당 한 번만 하는 게 좋음.)
    expect(asia.shortfall).equal(-6);
    expect(asia.profit).equal(292);
  });

  // 수요가 0인 경계조건 테스트
  it("zero demand", function () {
    asia.demand = 0;
    expect(asia.shortfall).equal(-25);
    expect(asia.profit).equal(0);
  });

  // 수요가 마이너스인 경계조건 테스트
  it("negative demand", function () {
    asia.demand = -1;
    expect(asia.shortfall).equal(-26);
    expect(asia.profit).equal(-10);
  });
});

// 경계지점 조건 검사하기
// 생산자가 없는 경계지점 상황 테스트
describe("no producer", function () {
  // producers 에 아무것도 넣지 않은 빈 배열로 데이터를 전달해서 Province 객체를 생성할 경우,
  // 이처럼 문제가 생길 수 있는 경계조건을 생각해보고 테스트하면, 예외사항을 어떻게 처리하는 게 좋을지 생각해보기 좋음.
  let noProducers;
  beforeEach(function () {
    const data = {
      name: "No producers",
      producers: [],
      demand: 30,
      price: 20,
    };
    noProducers = new Province(data);
  });

  it("shortfall", function () {
    expect(noProducers.shortfall).equal(30);
  });

  it("profit", function () {
    expect(noProducers.profit).equal(0);
  });
});

/**
 * 테스트에서 흔히 사용되는 패턴
 *
 * '설정 - 실행 - 검증'
 *
 * 1. 설정
 * 설정은 beforeEach() 에서 각 단위테스트에서
 * 공통으로 사용할 표준 픽스처 설정하는 걸 말함.
 *
 * 2. 실행
 * 실행은 단위테스트 내에서
 * 사용자가 픽스처의 상태값을 직접 변경하는 것.
 *
 * 3. 검증
 * 검증은 expect(), assert() 이런 함수로
 * 말 그대로 값을 '검증'하는 단계
 */
