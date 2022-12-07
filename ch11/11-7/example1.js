class Person {
  constructor(id) {
    this.id = id;
  }

  get name() {
    return this._name;
  }

  set name(arg) {
    this._name = arg;
  }

  get id() {
    return this._id;
  }

  set id(arg) {
    this._id = arg;
  }
}

// 호출자
const martin = new Person();
martin.name = "마틴";
martin.id = "1234";
