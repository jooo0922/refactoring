const fs = require("fs");
const path = require("path");
const FILE_NAME = "officeData.csv";

const csvPath = path.join(__dirname, "./", FILE_NAME);
const csv = fs.readFileSync(csvPath, "utf-8");
console.log(acquireData(csv));

function acquireData(input) {
  const lines = input.split("\n"); // 컬렉션 (String.split("\n") 하면, 줄 단위로 끊어진 문자열들이 담긴 배열을 리턴해 줄 것임.)
  const result = [];

  // 컬렉션이 사용할 루프변수 새로 만들기
  const loopItems = lines
    .slice(1) // 첫줄을 건너뛰는 if 문을 .slice() 파이프라인으로 교체
    .filter((line) => line.trim() !== ""); // 빈줄 건너뛰는 if 문을 filter() 파이프라인으로 교체
  for (const line of loopItems) {
    const record = line.split(","); // 각 라인마다 쉼표를 기준으로 끊어진 문자열들이 담긴 배열을 리턴함 (각 배열은 [office, country, telephone] 순으로 리턴되겠군)
    if (record[1].trim() === "India") {
      // .trim()을 왜 해주냐면, .csv 파일에서 "India, " 이런 식으로 각 항목이 저장되므로, 각 항목별 오른쪽 공백을 제거하기 위해서 trim() 을 쓰는것임.
      result.push({ city: record[0].trim(), phone: record[2].trim() });
    }
  }
  return result;
}
