const organization = new Organization({
  name: "애크미 구스베리",
  country: "GB",
}); // 레코드를 클래스로 교체

let result = "";
const newName = "새로운 이름";
result += `<h1>${getRawDataOfOrganization().name}</h1>`; // 읽기 예
getOrganization().name = newName; // 레코드 갱신 코드는 세터로 변경

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

  // 레코드 갱신 코드는 세터로 변경
  set name(aString) {
    this._data.name = aString;
  }
}
