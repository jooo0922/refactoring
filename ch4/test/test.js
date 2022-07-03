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
});
