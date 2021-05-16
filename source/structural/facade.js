class Bank {
  verify (_name, _amount) {
    return true;
  }
}

class Credit {
  get (_name) {
    return true;
  }
}

class Background {
  check (_name) {
    return true;
  }
}

class Mortgage {
  constructor (_name) {
    this.name = _name;
  }
  
  applyFor (amount) {
    let result = "approved";
    if (!new Bank().verify(this.name, amount)) {
        result = "denied";
    } else if (!new Credit().get(this.name)) {
        result = "denied";
    } else if (!new Background().check(this.name)) {
        result = "denied";
    }
    return `${this.name} has been ${result} for a ${amount} mortgage`
  }
}

const mortgage = new Mortgage("Joan Templeton");
const result = mortgage.applyFor("$100,000");

console.log(result);