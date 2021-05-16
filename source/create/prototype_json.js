const car = {
  noOfWheels: 4,
  start() {
    return `start ${this.noOfWheels}`;
  },
  stop() {
    return `stop ${this.noOfWheels}`;
  },
};

const myCar1 = Object.create(car, { owner: { value: 'Mung1' } });
const myCar2 = Object.create(car, { owner: { value: 'Mung2' } });

console.log(myCar1.__proto__ === car); // true
console.log(myCar2.__proto__ === car); // true

myCar2.noOfWheels += 10

console.log(myCar1.start()) // start 4
console.log(myCar1.stop()) // stop 4
console.log(myCar1.noOfWheels) // 4
console.log(myCar1.owner)  // Mung1

console.log(myCar2.noOfWheels) // 14