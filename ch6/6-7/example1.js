const obj = {
  articleTitle: "title",
};

let result = "";
let _title = "untitled";

result += `<h1>${title()}</h1>`; // 전역변수 참조

setTitle(obj["articleTitle"]); // 전역변수 수정

// 전역변수처럼 유효범위가 넓은 변수들은 이름을 바꾸기 전 접근자 메서드로 캡슐화함
// tpHd 변수의 게터
function title() {
  return _title;
}
// tpHd 변수의 세터
function setTitle(arg) {
  _title = arg;
}
