const organization = new Organization({
  name: "애크미 구스베리",
  country: "GB",
}); // 레코드를 클래스로 교체

let result = "";
const newName = "새로운 이름";
result += `<h1>${getOrganization().name}</h1>`; // 레코드 읽는 코드는 게터로 변경
getOrganization().name = newName; // 레코드 갱신 코드는 세터로 변경

// 새 클래스의 인스턴스를 반환하는 함수 생성
function getOrganization() {
  return organization;
}

// 레코드를 클래스로 생성
class Organization {
  constructor(data) {
    // 레코드 내의 필드들을 멤버변수로 펼쳐놓으면 더 깔끔
    this._name = data.name;
    this._country = data.country;
  }

  // 레코드 갱신 코드는 세터로 변경
  set name(aString) {
    this._name = aString;
  }

  // 레코드 읽는 코드는 게터로 변경
  get name() {
    return this._name;
  }

  set country(aCountryCode) {
    this._country = aCountryCode;
  }

  get name() {
    return this._country;
  }
}
