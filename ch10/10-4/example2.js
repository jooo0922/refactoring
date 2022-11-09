// 클라이언트 코드
const voyage = { zone: "서인도", length: 10 };
const history = [
  { zone: "동인도", profit: 5 },
  { zone: "서인도", profit: 15 },
  { zone: "중국", profit: -2 },
  { zone: "서아프리카", profit: 7 },
];
const myRating = rating(voyage, history);

// 투자 등급
function rating(voyage, history) {
  return createRating(voyage, history).value;
}

// 서브클래스 인스턴스를 생성하는 팩토리 함수
function createRating(voyage, history) {
  if (voyage.zone === "중국" && history.some((v) => "중국" === v.zone))
    return new ExperiencedChinaRating(voyage, history);
  else return new Rating(voyage, history);
}

// 변형 동작을 담당할 서브클래스 생성
class ExperiencedChinaRating extends Rating {
  get captainHistoryRisk() {
    // 서브클래스에 메서드 오버라이드 후, 변형동작을 옮겨옴.
    const result = super.captainHistoryRisk - 2;
    return Math.max(result, 0);
  }

  // 추출한 함수를 서브클래스 메서드에서 오버라이드 후, 변형동작 옮겨옴.
  get voyageAndHistoryLengthFactor() {
    let result = 0;
    result += 3;
    if (this.voyage.length > 12) result += 1;
    if (this.voyage.length > 18) result -= 1;
    return result;
  }

  historyLengthFactor() {
    return this.history.length > 10 ? 1 : 0;
  }
}

class Rating {
  constructor(voyage, history) {
    this.voyage = voyage;
    this.history = history;
  }

  get value() {
    const vpf = this.voyageProfitFactor;
    const vr = this.vovageRisk;
    const chr = this.captainHistoryRisk;
    if (vpf * 3 > vr + chr * 2) return "A";
    else return "B";
  }

  // 항해 경로 위험요소
  get voyageRisk() {
    let result = 1;
    if (this.voyage.length > 4) result += 2;
    if (this.voyage.length > 8) result += this.voyage.length - 8;
    if (["중국", "동인도"].includes(this.voyage.zone)) result += 4;
    return Math.max(result, 0);
  }

  // 선장의 항해 이력 위험요소
  get captainHistoryRisk() {
    let result = 1;
    if (this.history.length < 5) result += 4;
    result += this.history.filter((v) => v.profit < 0).length;
    return Math.max(result, 0);
  }

  // 중국을 경유하는가?
  get hasChinaHistory() {
    return this.history.some((v) => "중국" === v.zone); // Array.prototype.some() 메서드는 배열 안의 어떤 요소라도 주어진 판별 함수를 통과하는지 테스트합니다.
  }

  // 수익 요인 평가 함수
  get voyageProfitFactor() {
    let result = 2;
    if (this.voyage.zone === "중국") result += 1;
    if (this.voyage.zone === "동인도") result += 1;
    result += this.historyLengthFactor;
    result += this.voyageAndHistoryLengthFactor;
    return result;
  }

  // 변형동작이 얽혀있는 조건부 블록 전체를 함수로 추출
  get voyageAndHistoryLengthFactor() {
    let result = 0;
    if (this.voyage.length > 14) result -= 1;
    return result;
  }

  get historyLengthFactor() {
    return this.history.length > 8 ? 1 : 0;
  }
}
