/**
 * package.json 에서 "type": "module" 로 지정해놨으므로,
 * import 키워드를 통해 node.js 에서 기본적으로 제공하는 assert 모듈과
 * 테스트를 원하는 코드를 가져올 수 있음.
 */
import { assert } from "chai";
import { Province, sampleProvinceData } from "../Province.js";

describe("province", function () {
  it("shortfall", function () {
    const asia = new Province(sampleProvinceData()); // 픽스처(테스트에 필요한 데이터와 객체) 설정
    assert.equal(asia.shortfall, 5); // 검증
  });
});
