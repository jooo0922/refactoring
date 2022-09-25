function renderPerson(outStream, person) {
  outStream.write(`<p>${person.name}</p>\n`);
  renderPhoto(outStream, person.photo);
  zztmp(outStream, person.photo);
  outStream.write(`<p>위치: ${person.photo.location}</p>\n`);
}

function listRecentPhotos(outStream, photos) {
  photos
    .filter((p) => p.date > recentDataCutoff())
    .forEach((p) => {
      outStream.write("<div>\n");
      zztmp(outStream, p);
      outStream.write(`<p>위치: ${p.location}</p>\n`);
      outStream.write("</div>\n");
    });
}

function renderPhoto(outStream, photo) {
  return photo;
}

function recentDataCutoff() {
  return new Date();
}
