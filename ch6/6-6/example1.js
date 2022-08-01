const spaceship = {
  owner: {
    firstName: null,
    lastName: null,
  },
};

let defaultOwner = { firstName: "마틴", lastName: "파울러" }; // 중요한 데이터가 담긴 전역변수

// 캡슐화를 위해 데이터를 읽고 쓰는 함수(getter, setter) 를 정의함.
function getDefaultOwner() {
  return defaultOwner;
}
function setDefaultOwner(arg) {
  defaultOwner = arg;
}

spaceship.owner = defaultOwner; // 전역변수 참조
defaultOwner = { firstName: "레베카", lastName: "파슨스" }; // 전역변수 갱신
