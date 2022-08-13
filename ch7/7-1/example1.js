const organization = { name: "애크미 구스베리", country: "GB" };

let result = "";
const newName = "새로운 이름";
result += `<h1>${organization.name}</h1>`; // 읽기 예
organization.name = newName; // 쓰기 예
