// old system
class TicketPrice {
  request(start, end, overweightLuggage) {
    // 가격 계산 로직
    return "$150.34";
  }
}

// new interface
class NewTicketPrice {
  login (credentials) {  };
  setStart (start) { };
  setDestination (destination) {  };
  calculate (overweightLuggage) {
    return "$120.20";
  };
}

// 어댑터
class TicketAdapter {
  constructor (credentials) {
    this.pricing = new NewTicketPrice();
    this.pricing.login(credentials);
  }

  request(start, end, overweightLuggage) {
    this.pricing.setStart(start);
    this.pricing.setDestination(end);
    return this.pricing.calculate(overweightLuggage);
  }
}

var pricing = new TicketPrice();
var credentials = { token: "30a8-6ee1" };
var adapter = new TicketAdapter(credentials);

// original ticket pricing and interface
var price = pricing.request("Bern", "London", 20);
console.log("Old price: " + price);

// new ticket pricing with adapted interface
price = adapter.request("Bern", "London", 20);
console.log("New price: " + price);