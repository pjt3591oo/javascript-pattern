// 옛날 스타일
function OldPerson(name, age) {
  this.name = name;
  this.age = age;
  this.say = function () {
    console.log(`[OLD] ${this.name} is ${this.age} years old!`);
  }
}

// 인스턴스 생성
const oldPerson = new OldPerson('John', 20);
oldPerson.say(); // [OLD] Output - “John is 20years old!”

class NewPerson {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  say() {
    console.log(`[NEW] ${this.name} is ${this.age} years old!`);
  };
}

// 인스턴스 생성
const newPerson = new NewPerson('John', 20);
newPerson.say(); // [NEW] Output - “John is 20years old!”