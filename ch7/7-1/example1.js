const organization = { name: "애크미 구스베리", country: "GB" };

let result = "";
const newName = "새로운 이름";
result += `<h1>${getRawDataOfOrganization().name}</h1>`; // 읽기 예
getRawDataOfOrganization().name = newName; // 쓰기 예

// 변수 캡슐화
function getRawDataOfOrganization() {
  return organization;
}
