class Car {
  constructor (_wheels) {
    this.noOfWheels = _wheels;
  }
  
  start() {
    return `start ${this.noOfWheels}`;
  }
  
  stop() {
    return `stop ${this.noOfWheels}`;
  }
}

const car = new Car(4);

const cloneCar1 = Object.create(car, { owner: { value: 'Mung1' } });
const cloneCar2 = Object.create(car, { owner: { value: 'Mung2' } });

console.log(cloneCar1.__proto__ === car); // true
console.log(cloneCar2.__proto__ === car); // true

cloneCar2.noOfWheels += 10

console.log(cloneCar1.start()) // start 4
console.log(cloneCar1.stop()) // stop 4
console.log(cloneCar1.noOfWheels) // 4
console.log(cloneCar1.owner)  // Mung1

console.log(cloneCar2.noOfWheels) // 14