import Customer from "./Customer";

let _repositoryData; // 물리적으로 똑같은 고객 객체를 사용하기 위해, 유일한 고객객체를 저장해 둘 저장소 객체를 만듦.

// 저장소 객체 초기화 함수
export function initialize() {
  _repositoryData = {};
  _repositoryData.customers = new Map(); // 고객데이터를 Map 구조로 초기화하여 관리하려고 하나보네.
}

// 맵 구조 저장소에 유일한 고객데이터 저장 후, 저장된 고객데이터를 반환해주는 함수
export function registerCustomer(id) {
  // Map.has(id) 를 통해 동일한 id를 key로 갖는 고객데이터 객체의 중복생성을 방지함.
  if (!_repositoryData.customers.has(id)) {
    _repositoryData.customers.set(id, new Customer(id)); // Map 구조에 전달받은 id를 key 값으로 하여, 고객데이터 객체를 생성 및 저장함.
    return findCustomer(id); // 저장된 고객데이터 객체를 검색하여 반환함.
  }
}

// 맵 구조 저장소에서 특정 id를 key값으로 갖는 고객데이터 객체 반환해주는 함수
export function findCustomer(id) {
  return _repositoryData.customers.get(id);
}
