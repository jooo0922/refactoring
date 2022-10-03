const fs = require("fs");
const path = require("path");
const FILE_NAME = "officeData.csv";

const csvPath = path.join(__dirname, "./", FILE_NAME);
const csv = fs.readFileSync(csvPath, "utf-8");
console.log(acquireData(csv));

function acquireData(input) {
  const lines = input.split("\n"); // 컬렉션 (String.split("\n") 하면, 줄 단위로 끊어진 문자열들이 담긴 배열을 리턴해 줄 것임.)
  return lines // 누적변수 result 인라인
    .slice(1) // 첫줄을 건너뛰는 if 문을 .slice() 파이프라인으로 교체
    .filter((line) => line.trim() !== "") // 빈줄 건너뛰는 if 문을 filter() 파이프라인으로 교체
    .map((line) => line.split(",")) // 각 라인마다 csv 데이터 -> 문자열 배열로 변환하는 작업을 .map() 파이프라인으로 교체
    .filter((fields) => fields[1].trim() === "India") // 인도에 위치한 사무실 데이터 필터링을 .filter() 파이프라인으로 교체
    .map((fields) => ({ city: fields[0].trim(), phone: fields[2].trim() })); // 결과 데이터를 .map() 파이프라인 연산으로 가공
  // .trim()을 왜 해주냐면, .csv 파일에서 "India, " 이런 식으로 각 항목이 저장되므로, 각 항목별 오른쪽 공백을 제거하기 위해서 trim() 을 쓰는것임.
  // record -> fields 로 일부 변수명을 적절하게 교체 (넘어오는 인자 데이터가 객체 형태이므로, fields 라는 말이 더 적합함.)
}
