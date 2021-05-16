class Request {
  constructor (_amount) {
    this.amount = _amount;
  }

  get (bill) {
    const count = Math.floor(this.amount / bill);
    this.amount -= count * bill;
    console.log(`Dispense ${count} $${bill} bills`);
    return this;
  }
}

var request = new Request(378); //Requesting amount
request.get(100).get(50).get(20).get(10).get(5).get(1);