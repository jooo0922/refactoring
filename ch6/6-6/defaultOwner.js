// js 에서 특정 변수의 접근제한자를 설정하려면, 변수와 접근자만 따로 파일로 빼낸 뒤, 접근자만 exort 시켜서 사용하면 됨.

let defaultOwnerData = { firstName: "마틴", lastName: "파울러" }; // 중요한 데이터가 담긴 전역변수

// 캡슐화를 위해 데이터를 읽고 쓰는 함수(getter, setter) 를 정의함.
// js 에서 getter 이름에는 get을 빼고, setter 이름에만 set 을 붙여서 구분하는게 좋다고 함.
export function defaultOwner() {
  // 게터에서 데이터를 복사하여 리턴함으로써, 원본데이터 훼손을 방지함.
  return Object.assign({}, defaultOwnerData);
}
export function setDefaultOwner(arg) {
  defaultOwnerData = arg;
}
