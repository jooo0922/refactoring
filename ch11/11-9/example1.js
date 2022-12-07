// 원래 함수는 전달함수 역할로 남겨두기
function score(candidate, medicalExam, scoringGuide) {
  return new Scorer(candidate, medicalExam, scoringGuide).execute();
}

// 명령 객체
class Scorer {
  constructor(candidate, medicalExam, scoringGuide) {
    this._candidate = candidate;
    this._medicalExam = medicalExam;
    this._scoringGuide = scoringGuide;
  }

  execute() {
    let result = 0;
    let healthLevel = 0;
    let highMedicalRiskFlag = false;

    if (this._medicalExam.isSmoker) {
      healthLevel += 10;
      highMedicalRiskFlag = true;
    }
    let certificationGrade = "regular";
    if (
      this._scoringGuide.stateWithLowCertification(this._candidate.originState)
    ) {
      certificationGrade = "low";
      result -= 5;
    }
    // 비슷한 코드가 한참 이어짐
    result -= Math.max(healthLevel - 5, 0);
    return result;
  }
}
