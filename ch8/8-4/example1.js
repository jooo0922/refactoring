function renderPerson(outStream, person) {
  outStream.write(`<p>${person.name}</p>\n`);
  renderPhoto(outStream, photo);
  zztmp(outStream, photo);
  outStream.write(`<p>위치: ${photo.location}</p>\n`);
}

function listRecentPhotos(outStream, photos) {
  photos
    .filter((p) => p.date > recentDataCutoff())
    .forEach((p) => {
      outStream.write("<div>\n");
      zztmp(outStream, photo);
      outStream.write(`<p>위치: ${photo.location}</p>\n`);
      outStream.write("</div>\n");
    });
}

function zztmp(outStream, photo) {
  // 이동하지 않을 코드 (남기고 싶은 코드들만 새로운 함수로 추출한 것.)
  outStream.write(`<p>제목: ${photo.title}</p>\n`);
  outStream.write(`<p>날짜: ${photo.data.toDateString()}</p>\n`);
}

function renderPhoto(outStream, photo) {
  return photo;
}

function recentDataCutoff() {
  return new Date();
}
