class Person {
  constructor() {}
  
  make (type) {
    switch (type) {
      case 'house':
        return new House();
      case 'car':
        return new Car();
      default:
        return false;
    }
  }
}

class House {
  constructor() {}

  say () {
    console.log(`I'm House`);
  }
}

class Car {
  constructor() {}

  say () {
    console.log(`I'm Car`);
  }
}

const person = new Person()

const house = person.make('house')
const car = person.make('car')

house.say() // I'm House
car.say()   // I'm Car