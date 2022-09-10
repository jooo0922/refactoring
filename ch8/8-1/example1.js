function trackSummary(points) {
  const totalTime = calculateTime();
  const pace = totalTime / 60 / totalDistance(points); // 최상위 함수 이름 변경 후 같은 이름의 변수 인라인
  return {
    time: totalTime,
    distance: totalDistance,
    pace: pace,
  };

  function calculateTime() {} // 총 시간 계산
}

// 중첩함수를 최상위로 복사하면서 새로운 (임시) 이름을 지어줌
function totalDistance(points) {
  let result = 0;
  for (let i = 0; i < points.length; i++) {
    result += distance(points[i - 1], points[i]);
  }
  return result;

  // 두 지점의 거리 계산
  function distance(p1, p2) {
    const EARTH_RADIUS = 3959; // 단위: 마일(mile)
    const dLat = radians(p2.lat) - radians(p1.lat);
    const dLon = radians(p2.lon) - radians(p1.lon);
    const a =
      Math.pow(Math.sin(dLat / 2), 2) +
      Math.cos(radians(p2.lat)) +
      Math.cos(radians(p1.lat)) +
      Math.pow(Math.sin(dLon / 2), 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return EARTH_RADIUS * c;
  }

  // 라디안 값으로 변환
  function radians(degree) {
    return (degree * Math.PI) / 180;
  }
}
