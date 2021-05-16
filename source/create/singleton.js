class Car {
  constructor (_wheels) {
    this.wheels = _wheels;
  }
  
  setWheels(_n) {
    this.wheels = _n;
  }
}

const Singleton = {
  instance: null,

  getInstance(_param1) {
    if(!this.instance) this.instance = new Car(_param1);
    return this.instance
  },
};

let car1 = Singleton.getInstance(4);
let car2 = Singleton.getInstance(3);
let car3 = Singleton.getInstance(2);

console.log(car1.wheels, car2.wheels, car3.wheels); // 4 4 4
car2.setWheels(10)
console.log(car1.wheels, car2.wheels, car3.wheels); // 10 10 10