const spaceship = {
  owner: {
    firstName: null,
    lastName: null,
  },
};

let defaultOwner = { firstName: "마틴", lastName: "파울러" }; // 중요한 데이터가 담긴 전역변수

spaceship.owner = defaultOwner; // 전역변수 참조
defaultOwner = { firstName: "레베카", lastName: "파슨스" }; // 전역변수 갱신
