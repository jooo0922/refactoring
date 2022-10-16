// 고객 객체 -> 목록마다 동일한 고객 entity 에 해당하는 고객 객체를 여러개 복사해서 생성해야 하는 상황.
// 고객객체 하나에 변경이 생긴다면, 나머지 고객객체들에도 모두 일일이 수정해줘야 하는 번거로움이 존재함.
export default class Customer {
  constructor(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }
}
