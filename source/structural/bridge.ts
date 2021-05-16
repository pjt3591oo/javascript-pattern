// Implementor: 기능 구현을 위한 인터페이스
interface HuntingHandler {
  find(): void;
  detected(): void;
  attack(): void;
}

// ConcreteImplementor: Implementor를 상속받아 기능 구현
class HuntingMethod1 implements HuntingHandler {
  find(): void {
    console.log('find by HuntingMethod1')
  }
  detected(): void {
    console.log('detected by HuntingMethod1')
  }
  attack(): void {
    console.log('attack by HuntingMethod1')
  }
}

class HuntingMethod2 implements HuntingHandler {
  find(): void {
    console.log('find by HuntingMethod2')
  }
  detected(): void {
    console.log('detected by HuntingMethod2')
  }
  attack(): void {
    console.log('attack by HuntingMethod2')
  }
}

// Abstractor: 기능의 최상위 객체
class Animal {
  hunting: HuntingHandler;

  constructor(hunting: HuntingHandler) {
    this.hunting = hunting
  }

  find() {
    this.hunting.find();
  }
  detected() {
    this.hunting.detected();
  }
  attack() {
    this.hunting.attack();
  }

  hunt() {
    this.find();
    this.detected();
    this.attack();
  }
}

// RefineAbstraction: 최상위 Abstractor 상속받아 실제 클래스 구현
class Tiger extends Animal {
  constructor(hunting: HuntingHandler) {
    super(hunting);
  }

  hunt() {
    super.hunt()
    console.log("사냥끝~~");
  }
}

class Bird extends Animal {
  constructor(hunting: HuntingHandler) {
    super(hunting);
  }

  hunt() {
    super.hunt()
    console.log("사냥끝~~");
  }
}

const tiger: Animal = new Tiger(new HuntingMethod2());
const bird: Animal = new Bird(new HuntingMethod1());

tiger.hunt();
console.log("--------------");
bird.hunt();