class Book {
  constructor() {
    this._reservations = [];
  }

  addReservation(customer, isPriority) {
    assert(isPriority === true || isPriority === false);
    this._reservations.push(customer);
  }
}

const book = new Book();
book.addReservation(customer, false);
