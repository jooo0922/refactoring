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
    return this._courses.slice(); // 컬렉션 읽기 메서드는 복제본을 반환하도록 수정
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
for (const name of readBasicCourseNames(filename)) {
  aPerson.addCourse(new Course(name, false)); // 컬렉션 요소 추가 메서드를 사용하도록 교체
}
