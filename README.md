견고한 프로그램을 개발하는 원리 자바스크립트 패턴과 테스트 내용.

[quick start]("https://github.com/pjt3591oo/javascript-pattern/tree/master/intro")

디자인 패턴

## Why Patterns? (왜 패턴을 사용해야 하는가?)

### 1.  Avoid Reinventing the wheel (바퀴를 다시 만들지 말아라)

### 2. Codebase Maintenance (코드 베이스 유지관리)

### 3. Easily reused (쉬운 재사용성)

### 4. Enables efficient communication (효율적인 의사소통)

### 5. Improve your Object-oriented skills (객체지향 스킬 향상)



## Criticism of Patterns (패턴의 단점)

### 1. Increases Complexity (복잡도 증가)

### 2. Reduced Relevance (관련성 감소)

### 3. Lazy Design (게으른, 로딩, 지연? 디자인)



## JavaScript Design Patterns (자바스크립트 디자인패턴들)

### 1. Flexible with programming styles (유연한 프로그래밍 스타일)

### 2. Supports First-class Functions (클래스 제공 함수)

### 3. Prototype-based Inheritance (프로토타입 기반 상속)



## Categories of Design Pattern

### 1. Creational Design Pattern (생성 패턴)

### 2. Structural Design Patterns (구조적 패턴)

### 3. Behavioral Design Patterns (행위 패턴)

![](https://github.com/pjt3591oo/javascript-pattern/blob/master/resource/Design-Patterns.png?raw=true)

여기서는 모든 패턴을 다루지 않고 JavaScript에 특화된 패턴을 다룬다.

# Creational Design Pattern

```
Constructor
Factory
Abstract Factory
Prototype
Singleton
Builder
```

### 1. Constructor Pattern (생성자 패턴)

생성자 패턴은 기존에 클래스를 제공하지 않았던 자바스크립트가 ES6에서 class 키워드 제공을 통해 향상된 패턴

* Old Style

```js
function OldPerson(name, age) {
  this.name = name;
  this.age = age;
  this.getDetails = function () {
    console.log(`[OLD] ${this.name} is ${this.age} years old!`);
  }
}

// 인스턴스 생성
const oldPerson = new OldPerson('John', 20);
oldPerson.say(); // [OLD] Output - “John is 20years old!”
```

* New Style

```js
class NewPerson {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.say() = function () {
      console.log(`[NEW] ${this.name} is ${this.age} years old!`);
    };
  }
}

// 인스턴스 생성
const newPerson = new NewPerson('John', 20);
newPerson.say(); // [NEW] Output - “John is 20years old!”
```

### 2. Factory Pattern (팩토리 패턴)

팩토리 패턴은 클래스가 객체를 생성하는 패턴

* 구조

![](https://github.com/pjt3591oo/javascript-pattern/blob/master/resource/create/Factory-Pattern.png?raw=true)

Factory 클래스에 의해 생성하는 객체는 동일한 인터페이스를 가져야 함

* 예시

```js
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
```

### 3. Prototype Pattern (프로토타입 패턴)

프로토타입 패턴은 객체의 템플릿을 기반으로 새로운 객체를 만들 수 있다. 프로토타입 패턴은 상속을 기반으로 하지만 JavaScript는 Object의 create() 메소드를 활용하여 손쉽게 구현 가능.

* 구조

![](https://github.com/pjt3591oo/javascript-pattern/blob/master/resource/create/Prototype-Pattern.jpeg?raw=true)

* 예시(json)

```js
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
```

*  예시(class)

```js
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
```



### 4. Singleton Pattern (싱글톤 패턴)

싱글톤은 하나의 객체만 생성하는 목적으로 사용

디비 커넥션 처럼 한 시스템에서 매번 커넥션을 연결할 필요 없을 때 싱글톤을 이용하여 하나의 커넥션만 유지

* 구조

![](https://github.com/pjt3591oo/javascript-pattern/blob/master/resource/create/Singleton-Pattern.jpeg?raw=true)

* 예시

```js
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
```



### 5. Builder Pattern (빌더 패턴)

빌더 패턴은 체이닝 형태를 유지하여 확장성 있는 객체를 만들 수 있음

* Before

```js
class Request { 
  constructor(url, data, method) { 
    this.url = url; 
    this.method = method; 
    this.data = data; 
  } 
}
```

만약 url과 method만 설정하고 싶다면 다음과 같이 객체를 생성할 수 있음

```js
const request = new Request('http://localhost', {}, method)
```

하지만 data를 반드시 전달해줘야 함 

빌더 패턴을 사용하면 전달하지 않아도 될 인자는 전달할 필요 없음

```js
class Request { 
  constructor() { 
    this.url = ''; 
    this.method = ''; 
    this.data = null; 
  } 
} 

class RequestBuilder { 
  constructor() { 
    this.request = new Request(); 
  } 
  forUrl(url) { 
    this.request.url = url; 
    return this; 
  } 
  
  useMethod(method) { 
    this.request.method = method; 
    return this; 
  } 
  
  setData(data) { 
    this.request.data = data; 
    return this; 
  } 
  
  build() { 
    return this.request; 
  } 
} 

let getRequest = new RequestBuilder() 
  .forUrl('https://blog.naver.com/pjt3591oo') 
  .useMethod('GET') 
  .build(); 
  
let postRequest = new RequestBuilder() 
    .forUrl('https://blog.naver.com/pjt3591oo') 
    .useMethod('POST') 
    .setData({ id: 'hg', password: 1234 }) 
    .build();
```

한 가지 중요한 점은 속성을 설정하는 메소드는 반드시 this를 반환하여 체이닝이 가능하도록 해야함

# Structural Design Pattern

```
Adapter
Composite
Module
Decorator
Facade
Proxy
```

### 1. Adapter Pattern (어댑터 패턴)

어댑터 패턴은 서로다른 인터페이스 시스템을 맞추기 위해 어댑터를 추가하여 마치 하나의 시스템인 것 처럼 동작하는 패턴

![](https://github.com/pjt3591oo/javascript-pattern/blob/master/resource/structural/Adapter-Pattern.png?raw=true)

Client는 과거에 만들어진 인터페이스 

Adaptee는 발전된 형태의 인터페이스

기존의 코드는 Client 인터페이스에 맞춰서 개발이 되었기 때문에 새로 개발된 Adaptee를 사용하기 위해선 인터페이스를 수정해야 하지만 Adapter를 이용하여 기존 코드의 인터페이스 수정없이 Adaptee를 사용 할 수 있음

* 예시

```javascript
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
```

기존의 TicketPrice를 TickerAdapter로 사용자 변경없이 사용가능

어댑터 패턴의 핵심은 기존의 사용중인 인터페이스를 사용자의 큰 변화없이 사용하는 것이 목표



### 2. Composite Pattern (컴포지트 패턴)

컴포지트 패턴은 파티셔닝 JS 디자인 패턴이라고도 불리며 디렉터리(폴더) 구조를 관리하는 모습을 보임

이 모습은 마치 React나 Vue와 같이 컴포넌트를 관리하는 모습을 가짐

![](https://github.com/pjt3591oo/javascript-pattern/blob/master/resource/structural/Composite-Pattern.jpeg?raw=true)

* 예시

```js
class File {
  constructor(_name) {
    this.name = _name;
  }

  display () {
    console.log(this.name);
  }
}

class Directory {
  constructor (_name) {
    this.name = _name;
    this.files = [];
  }

  add (file) {
    this.files.push(file);
  }

  remove (_file) {
    let beforeCnt = this.files.length;
    this.files = this.files.filter(file => file.name !== _file.name);
    let afterCnt = this.files.length;

    return beforeCnt === afterCnt;
  }

  getFileName (_idx) {
    return this.files[_idx].name
  }

  display () {
    console.log(this.name);
    this.files.forEach((file, idx)  => {
      console.log(`  ${this.getFileName(idx)}`) // file.name
    })
  }
}

const directoryOne = new Directory('Directory One');
const directoryTwo = new Directory('Directory Two');
const directoryThree = new Directory('Directory Three');

const fileOne = new File('File One');
const fileTwo = new File('File Two');
const fileThree = new File('File Three');

directoryOne.add(fileOne);
directoryOne.add(fileTwo);

directoryTwo.add(fileOne);

directoryThree.add(fileOne);
directoryThree.add(fileTwo);
directoryThree.add(fileThree);

directoryOne.display();
directoryTwo.display();
directoryThree.display();
```



### 3. Module Pattern (모듈 패턴)

자바스크립트의 모듈 패턴은 클로저를 이용하여 함수를 마치 클래스처럼 사용하는 기법

```js
function AnimalContainter () {
  const container = [];

  function addAnimal (name) {
    container.push(name);
  }

  function getAllAnimals() {
    return container;
  }

  function removeAnimal(name) {
    const index = container.indexOf(name);
    if(index < 1) {
      throw new Error('Animal not found in container');
    }
    container.splice(index, 1)
  }

  return {
    add: addAnimal,
    get: getAllAnimals,
    remove: removeAnimal
  }
}

  const container = AnimalContainter()
  container.add('Hen')
  container.add('Goat')
  container.add('Sheep')

  console.log(container.get()) // ["Hen", "Goat", "Sheep"]
  container.remove('Sheep')
  console.log(container.get()) // ["Hen", "Goat"]
```

AnimalContainter에서 반환(리턴)된 변수 / 함수만 외부에서 접근하여 사용가능



### 4. Decorator Pattern (데코레이터, 장식자 패턴)

데코레이터는 코드 재사용을 목적으로 함. 자바스크립트에선 이를 쉽게 구현할 수 있다. 이를 이용하여 동일한 클래스로 만들어진 객체에 다른 동작을 부여할 수 있다

* 예시

```js
class Vehicle {
  constructor (vehicleType = "car") {
    this.vehicleType = vehicleType;
    this.model = 'default';
    this.license = '12345-123';
  }
}

const truck = new Vehicle( "truck" );

// 여기서 화살표 함수를 사용하면 this 바인딩이 안되기 떄문에 function 이용
truck.setModel = function( _model ){
    this.model = _model;
};

truck.setColor = function( _color ){
    this.color = _color;
};

truck.setModel( "CAT" );
truck.setColor( "blue" );

console.log( truck );
/*
Vehicle {
  vehicleType: 'truck',
  model: 'CAT',
  license: '12345-123',
  setModel: [Function],
  setColor: [Function],
  color: 'blue'
}
*/

const dump = new Vehicle( "dump" );
console.log(dump) // Vehicle { vehicleType: 'dump', model: 'default', license: '12345-123' }

```

truck으로 전달된 변수 truck만 setModel()과 setColor() 메소드 수행 



### 5. Facade Pattern (퍼사드 패턴)

퍼사드 패턴은 내부적으로 복잡한 구조(Subsystem)를 단순화(Facade)하여 외부에 공개하는 패턴

* 구조

![](https://github.com/pjt3591oo/javascript-pattern/blob/master/resource/structural/Facade-Pattern.png?raw=true)

* 예시

```js
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
```

클래스 1, 2, 3에 해당하는 Bank, Credit, Background 클래스로 구현된 기능을 Mortgage의 applyFor 메소드를 통해 제공




### 6. Proxy Pattern (프록시 패턴)

프록시 패턴은 접근을 제어하고 비용 절감하며 복잡성을 줄이기 위해 사용

프록시는 네트워크 연결, 큰 메모리 객체와 같은 비용이 많이 들거나 복제가 불가능한 리소스 같은 형태에서 사용

* 구조

![](https://github.com/pjt3591oo/javascript-pattern/blob/master/resource/structural/Proxy-Pattern.png?raw=true)

만약 파일을 읽어야 한다면 파일을 직접 읽지 않고 프록시 객체를 통해 접근. 프록시는 반복된 파일 접근에 대해 캐싱 처리 등을 수행할 수 있다. 프록시 패턴을 적용하는 상황은 다음과 같다.

```
가상 프록시: 생성 비용이 높거나 리소스를 많이 사용하는 객체를 위한 프록시
원격 프록시: 원격 객체에 대한 접근 제어
보호 프록시: 민감한 마스터 객체에 대한 접근 권한 제어
```

* 예시

```js
class FlightListAPI {
  getFlight() {
      // get master list of flights
      console.log('Generating flight List');
  }

  searchFlight (flightDetails) {
      // search through the flight list based on criteria
      console.log('Searching for flight');
  }
  
  addFlight(flightData) {
      // add a new flight to the database
      console.log('Adding new flight to DB');
  }
};
  
class FlightListProxy {
  constructor () {
    this.flightList = new FlightListAPI();
  }
  getFlight() {
    return this.flightList.getFlight();
  }

  searchFlight(flightDetails) {
    return this.flightList.searchFlight(flightDetails);
  }

  addFlight(flightData) {
    return this.flightList.addFlight(flightData);
  }
}
  
console.log("----------With Proxy----------")
const proxy = new FlightListProxy()
proxy.getFlight() // Generating flight List

```

FlightListApi를 직접 제어하지 않고 Proxy를 통해 제어

# Behavioral Design Pattern

```
Chain of Responsibility
Command
Observer
Iterator
Template
Strategy
```

###1. Chain of Responsibility Pattern

빌더 패턴을 구현하는 핵심 패턴

```js
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
```

this를 반환하여 체이닝을 할 수 있도록 함



### 2. Command Pattern

Command 패턴은 동작이나 작업을 캡술화하는 패턴

A라는 클래스를 작업을 하기 위해 A객체를 직접 접근하지 않고 중간 객체를 통해 작업수행

* 예시

```js
const calculator = {
  add: function(x, y) {
      return x + y;
  },
  sub: function(x, y) {
      return x - y;
  },
  divide: function(x,y){
      return x/y;
  },
  multiply: function (x,y){
      return x*y;
  }
}

const manager = {
  execute: function(name) {
      if (name in calculator) {
          return calculator[name].apply(calculator, [].slice.call(arguments, 1));
      }
      return false;
  }
}

console.log(manager.execute("add", 5, 2)); //  7
console.log(manager.execute("multiply", 2, 4)); //  8
```

### 3. Observer Pattern

Observer 패턴은 관찰중인 객체(Subject)에 발생하는 이벤트에 대해 여러 객체(Observer)에게 알리는 구독 메커니즘 제공

* 구조

![](https://github.com/pjt3591oo/javascript-pattern/blob/master/resource/structural/Observer-Pattern.jpeg?raw=true)

* 예시

```js
class Click {
  constructor () {
    this.observers = [];
  }

  subscribe (fn) {
    this.observers.push(fn);
  }

  unsubscribe(fn) {
    this.observers = this.observers.filter( (item) => item !== fn );
  }

  fire(o, thisObj) {
    let scope = thisObj;
    this.observers.forEach(function(item) {
      item.call(scope, o);
    });
  }
}

const clickHandler = item => { 
  console.log("Fired:" +item);
};

const click = new Click();

click.subscribe(clickHandler);
click.fire('event #1');

click.unsubscribe(clickHandler);
click.fire('event #2');

click.subscribe(clickHandler);
click.fire('event #3');
```

* 실행결과

```js
Fired:event #1
Fired:event #3
```



### 4. Iterator Pattern

반복자 패턴을 통해 순차적으로 접근 가능, 하지만 ES6의 제너레이터를 이용하면 좀 더 편하게 구현 가능

* old

```js
const items = [1, "hello", false, 99.8];

class Iterator {
  constructor(items) {
    this.items = items;
    this.index = 0;
  }

  hasNext(){
    return this.index < this.items.length;
  }

  next(){
    return this.items[this.index++]
  }
}

const iterator =  new Iterator(items);
while(iterator.hasNext()){
  console.log(iterator.next());
}
```

* 제너레이터 이용

```js
const items = [1, "hello", false, 99.8];

function* Iterator (target) {
  for(item in target) {
    yield item;
  }
}

const iterator = Iterator(items);

for (item of iterator) {
  console.log(item)
}
```



### 5. Template Pattern

템플릿 패턴은 객체의 뼈대만 정의. 객체가 만들어지면 세부적인 내용 정의

* 구조

![](https://github.com/pjt3591oo/javascript-pattern/blob/master/resource/structural/Template-Pattern.png?raw=true)

* 예시

```js
// 인터페이스 클래스
// 사용자가 구현할 항목 명시
class DataStore {
  connect() {}

  select() {}

  disconnect() {}
}

class Mysql extends DataStore {
  constructor () {
    super()
  }

  process() {
    this.connect();
    this.select();
    this.disconnect();
  }
}

const mySql = new Mysql();

// 상속받은 인터페이스 정의
mySql.connect = function() {
  console.log("MySQL: connect step");
};

mySql.select = function() {
  console.log("MySQL: select step");
};

mySql.disconnect = function() {
  console.log("MySQL: disconnect step");
};

mySql.process();
```

템플릿 패턴은 특정 기능을 제공하기 위해 구현할 기능 인터페이스를 제공함으로써 사용자가 원하는 기능을 구현할 수 있도록 도와줌  

process() 메서드 호출시 수행하는 메소드들을 객체 생성 후 정의한대로 동작



### 6. Strategy Pattern

Strategy 패턴은 A, B에 대한 알고리즘 정의후 각 알고리즘을 캡슐화하여 런타임 환경에서 각 알고리즘 상호교환

* 구조

![](https://github.com/pjt3591oo/javascript-pattern/blob/master/resource/structural/Strategy-Pattern.png?raw=true)

* 예시

```js
// 전략1 
class FedEx {
  constructor () {}
  calculate(p) {
    return 'FedEx'
  }

}

// 전략2
class UPS {
  constructor () {}
  calculate (p) {
    return 'UPS'
  }
}

// 전략3
class USPS {
  constructor () {}
  calculate (p) {
    return 'USPS'
  }
}

// 전략관리 클래스
class Strategy {
  constructor () {
    this.company = null
  }

  setStrategy (company) {
    this.company = company;
  }

  calculate (p) {
    console.log('this.company')
    if (!this.company) {return}
    return this.company.calculate(p);
  }
}

// 사용
const fedex = new FedEx();
const ups = new UPS();
const usps = new USPS();

const p = { from: 'Alabama',to:'Georgia',weight:1.5};

const strategy = new Strategy();
strategy.setStrategy(fedex); // 런타임 환경에서 ups, usps를 전달할 수 있음
console.log(`Fedex: ${strategy.calculate(p)}`);  // Fedex: FedEx
```



### 7. Visitor pattern (방문자 패턴)

방문자 패턴은 방문자(데이터 구조)와 방문 공간(데이터 연산)을 분리. 방문자는 방문 공간으로부터 행동을 위임받아 수행

새로운 연산을 추가하기 위해 새로운 방문자 추가

*  구조

![](https://github.com/pjt3591oo/javascript-pattern/blob/master/resource/behavioural/visitor_pattern_uml_diagram.jpeg?raw=true)

* 방문공간 정의

```ts
interface ComputerPart {
  accept(computerPartVisitor: ComputerPartVisitor): void;
}


class Keyboard implements ComputerPart {
  accept( computerPartVisitor: ComputerPartVisitor) {
     computerPartVisitor.visit(this);
  }
}
class Monitor implements ComputerPart {
  accept( computerPartVisitor: ComputerPartVisitor) {
     computerPartVisitor.visit(this);
  }
}
class Mouse implements ComputerPart {
  accept( computerPartVisitor: ComputerPartVisitor) {
     computerPartVisitor.visit(this);
  }
}
class Computer implements ComputerPart {
  parts: ComputerPart[];
  constructor() {
    this.parts = [new Mouse(), new Monitor(), new Keyboard()]
  }

  accept(computerPartVisitor: ComputerPartVisitor) {
    for (let i = 0; i < this.parts.length; i++) {
      this.parts[i].accept(computerPartVisitor);
   }
    computerPartVisitor.visit(this);
  }
}
```

방문자 패턴을 위한 방문 공간(ComputerPart)정의를 완료했다. 해당 공간을 방문할 방문자(ComputerPartVisitor)를 정의해보도록 하자 

방문공간은 accept(방문자) 메소드를 통해 방문자를 받는다

* 방문자 정의

```ts
interface ComputerPartVisitor {
	visit(computer: Computer);
	visit(mouse: Mouse);
	visit(keyboard: Keyboard);
	visit(monitor: Monitor);
}

class ComputerPartDisplayVisitor implements ComputerPartVisitor {

  visit(computer: Computer): void  {
     console.log("Displaying Computer.");
  }

  visit(mouse: Mouse): void  {
     console.log("Displaying Mouse.");
  }

  visit(keyboard: Keyboard): void  {
     console.log("Displaying Keyboard.");
  }

  visit(monitor: Monitor): void  {
     console.log("Displaying Monitor.");
  }
}
```

이와같이 동일한 메소드 이름과 다른 파라미터를 통해 메소드를 구성하는 방법을 오버로딩이라고 부름

JavaScript, TypeScript는 오버로딩 지원하지 않음

다음과 같이 대체하여 구현

```typescript
class ComputerPartDisplayVisitor implements ComputerPartVisitor {
  visit(monitor: Computer | Mouse | Keyboard | Monitor): void {
    if (monitor instanceof Computer) {
      console.log("Displaying Computer.");
    } else if (monitor instanceof Mouse) {
      console.log("Displaying Mouse.");
    } else if (monitor instanceof Keyboard) {
      console.log("Displaying Keyboard.");
    } else if (monitor instanceof Monitor) {
      console.log("Displaying Monitor.");
    }
  }
}
```

```typescript
let computer: ComputerPart = new Computer();
computer.accept(new ComputerPartDisplayVisitor());

/*
실행결과
Displaying Mouse.
Displaying Monitor.
Displaying Keyboard.
Displaying Computer.
*/
```



8. State Pattern (상태패턴)

상태패턴은 상태에 따라 다른 동작을 해야하는 경우 상태 객체를 통해 행동함

상태에 따른 액션을 추가할 때 상태 객체를 추가하여 메인 객체가 해당 상태 객체를 가지고 있는다.

* 구조

![https://github.com/pjt3591oo/javascript-pattern/blob/master/resource/behavioural/state_pattern_diagram.png?raw=true)

* 예시

```typescript
interface StateInterface {
  on(light: Light): void;
  off(light: Light): void;
}

class OnState implements StateInterface {
  stateName: string;

  constructor() {
    this.stateName = 'ON'
  }
  
  getInstance () { 
    return factory.ON
  }

  on (light) {
    light.setState(factory.ON.getInstance())
    console.log('... 동작하지 않음')
  }

  off (light) {
    light.setState(factory.OFF.getInstance())
    console.log('전원 off')
  }
}

class OffState implements StateInterface{
  stateName: string;
  
  constructor() {
    this.stateName = 'OFF'
  }
  
  getInstance () {
    return factory.OFF
  }

  on (light) {
    light.setState(factory.ON.getInstance())
    console.log('전원 on')
  }

  off (light) {
    light.setState(factory.OFF.getInstance())
    console.log('... 동작하지 않음')
  }
}

type State = OnState | OffState;

let factory = {
  ON: new OnState(),
  OFF: new OffState()
}

class Light {
  state: State;

  constructor () {
    this.state = factory.ON.getInstance()
  }

  showState() {
    console.log(`current state: ${this.state.stateName} \n`)
  }

  setState (state: State) {
    this.state = state
  }

  onButtonPress () {
    this.state.on(this)
  }

  offButtonPress () {
    this.state.off(this)
  }
}

let l = new Light()
l.showState()

l.onButtonPress()
l.showState()

l.offButtonPress()
l.showState()

l.offButtonPress()
l.showState()

l.onButtonPress()
l.showState()

l.onButtonPress()
l.showState()

l.onButtonPress()
l.showState()
```



