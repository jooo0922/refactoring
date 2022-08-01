import { getDefaultOwner, setDefaultOwner } from "./defaultOwner";

const spaceship = {
  owner: {
    firstName: null,
    lastName: null,
  },
};

spaceship.owner = getDefaultOwner(); // 전역변수 참조
setDefaultOwner({ firstName: "레베카", lastName: "파슨스" }); // 전역변수 갱신
