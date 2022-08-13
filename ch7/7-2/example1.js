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
