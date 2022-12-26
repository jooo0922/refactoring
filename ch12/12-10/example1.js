class Booking {
  constructor(show, date) {
    this._show = show;
    this._date = date;
  }

  get hasTalkBack() {
    return this._show.hasOwnProperty("talkback") && !this.isPeakDay;
  }

  get basePrice() {
    let result = this._show.price;
    if (this.isPeakDay) result += Math.round(result * 0.15);
    return result;
  }
}

class PremiumBooking extends Booking {
  constructor(show, date, extras) {
    super(show, date);
    this._extras = extras;
  }

  get hasTalkBack() {
    return this._show.hasOwnProperty("talkback");
  }

  get basePrice() {
    return Math.round(super.basePrice + this._extras.premiumFee);
  }

  get hasDinner() {
    return this._extras.hasOwnProperty("dinner") && !this.isPeakDay;
  }
}

// 클라이언트(일반 예약)...
aBooking = new Booking(show, date);

// 클라이언트(프리미엄 예약)...
aBooking = new PremiumBooking(show, date, extras);
