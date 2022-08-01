const obj = {
  articleTitle: "title",
};

let result = "";
let tpHd = "untitled";

result += `<h1>${tpHd}</h1>`; // 전역변수 참조

tpHd = obj["articleTitle"]; // 전역변수 수정
