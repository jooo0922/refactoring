function renderPerson(outStream, person) {
  const result = [];
  result.push(`<p>${person.name}</p>`);
  result.push(renderPhoto(person.photo));
  result.push(zznew(person.photo));
  return result.join("\n");
}

function photoDiv(p) {
  return ["<div>", zznew(p), "<div>"].join("\n");
}

// 타겟 함수 호출자 중 하나를 추출함.
function zznew(p) {
  return [
    `<p>제목: ${p.title}</p>`, // 제목 출력
    emitPhotoData(p),
  ].join("\n");
}

function emitPhotoData(aPhoto) {
  const result = [];
  result.push(`<p>위치: ${aPhoto.location}</p>`);
  result.push(`<p>날짜: ${aPhoto.data.toDataString()}</p>`);
  return result.join("\n");
}

function renderPhoto(photo) {
  return;
}
