class Book {
  constructor() {
    this._reservations = [];
  }

  zz_addReservation(customer, isPriority) {
    assert(isPriority === true || isPriority === false);
    this._reservations.push(customer);
  }
}

const book = new Book();
book.zz_addReservation(customer, false);
