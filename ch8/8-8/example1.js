const fs = require("fs");
const path = require("path");
const FILE_NAME = "officeData.csv";

const csvPath = path.join(__dirname, "./", FILE_NAME);
const csv = fs.readFileSync(csvPath, "utf-8");
console.log(acquireData(csv));

function acquireData(input) {
  const lines = input.split("\n"); // 컬렉션 (String.split("\n") 하면, 줄 단위로 끊어진 문자열들이 담긴 배열을 리턴해 줄 것임.)
  let firstLine = true;
  const result = [];
  for (const line of lines) {
    if (firstLine) {
      firstLine = false;
      continue; // 첫 번째 줄 건너뜀. -> .csv 파일의 첫번째 줄은 항목 데이터(office, country, telephone)만 있으니까 건너뛰는 것!
    }
    if (line.trim() === "") continue; // 각 라인별 문자열의 양끝 공백을 제거했을때 아무것도 없는 문자열이어도 건너뜀.
    const record = line.split(","); // 각 라인마다 쉼표를 기준으로 끊어진 문자열들이 담긴 배열을 리턴함 (각 배열은 [office, country, telephone] 순으로 리턴되겠군)
    if (record[1].trim() === "India") {
      // .trim()을 왜 해주냐면, .csv 파일에서 "India, " 이런 식으로 각 항목이 저장되므로, 각 항목별 오른쪽 공백을 제거하기 위해서 trim() 을 쓰는것임.
      result.push({ city: record[0].trim(), phone: record[2].trim() });
    }
  }
  return result;
}
