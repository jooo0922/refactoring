// 원래 함수는 전달함수 역할로 남겨두기
function score(candidate, medicalExam, scoringGuide) {
  return new Scorer().execute(candidate, medicalExam, scoringGuide);
}

// 명령 객체
class Scorer {
  execute(candidate, medicalExam, scoringGuide) {
    let result = 0;
    let healthLevel = 0;
    let highMedicalRiskFlag = false;

    if (medicalExam.isSmoker) {
      healthLevel += 10;
      highMedicalRiskFlag = true;
    }
    let certificationGrade = "regular";
    if (scoringGuide.stateWithLowCertification(candidate.originState)) {
      certificationGrade = "low";
      result -= 5;
    }
    // 비슷한 코드가 한참 이어짐
    result -= Math.max(healthLevel - 5, 0);
    return result;
  }
}
