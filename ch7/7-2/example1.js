// 수업(course) 목록을 지니고 있는 Person 클래스
class Person {
  constructor(name) {
    this._name = name;
    this._courses = [];
  }
  get name() {
    return this._name;
  }
  get courses() {
    return this._courses;
  }
  set courses(aList) {
    this._courses = aList;
  }
  // 컬렉션 요소 추가 메서드
  addCourse(aCourse) {
    this._courses.push(aCourse);
  }
  // 컬렉션 요소 제거 메서드
  removeCourse(
    aCourse,
    fnIfAbsent = () => {
      throw new RangeError();
    }
  ) {
    const index = this._courses.indexOf(aCourse);
    if (index === -1)
      fnIfAbsent(); // 제거 메서드는 컬렉션에 없는 원소를 입력받았을 때의 대응방식을 정헤야 함.
    else this.courses.splice(index, 1);
  }
}

class Course {
  constructor(name, isAdvanced) {
    this._name = name;
    this._isAdvanced = isAdvanced;
  }
  get name() {
    return this._name;
  }
  get isAdvanced() {
    return this._isAdvanced;
  }
}

function readBasicCourseNames(filename) {
  return ["국어", "영어", "수학"];
}
const aPerson = new Person("john");
const filename = "수업목록";
const basicCourseNames = readBasicCourseNames(filename);
aPerson.courses = basicCourseNames.map((name) => new Course(name, false)); // Person 클래스의 수업 컬렉션을 통째로 수정하는 클라이언트
