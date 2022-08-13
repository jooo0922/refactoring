const organization = new Organization({
  name: "애크미 구스베리",
  country: "GB",
}); // 레코드를 클래스로 교체

let result = "";
const newName = "새로운 이름";
result += `<h1>${getRawDataOfOrganization().name}</h1>`; // 읽기 예
getRawDataOfOrganization().name = newName; // 쓰기 예

// 변수 캡슐화
function getRawDataOfOrganization() {
  return organization._data;
}
// 새 클래스의 인스턴스를 반환하는 함수 생성
function getOrganization() {
  return organization;
}

// 레코드를 클래스로 생성
class Organization {
  constructor(data) {
    this._data = data;
  }
}
