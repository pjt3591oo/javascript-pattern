class Memento {
  state: string = '';

  constructor(state: string){
    this.state = state;
  }

  getState(): string{
  return this.state;
  }	
}

class Originator {
  state: string;

  setState(state: string): void {
    this.state = state;
  }

  getState(): string {
    return this.state;
  }

  saveStateToMemento(): Memento {
    return new Memento(this.state);
  }

  getStateFromMemento(memento: Memento): void {
    this.state = memento.getState();
  }
}

// 상태 복원 객체
class CareTaker {
  mementos: Memento[] = [];

  constructor() { }
  
  add(state: Memento): void {
    this.mementos.push(state);
  }

  get(idx: number): Memento {
    return this.mementos[idx];
  }
}

const originator: Originator = new Originator();
const careTaker: CareTaker = new CareTaker();

originator.setState("상태 #1");
originator.setState("상태 #2");
careTaker.add(originator.saveStateToMemento());
originator.setState("상태 #3");
careTaker.add(originator.saveStateToMemento());
originator.setState("상태 #4");

console.log("현재상태: " + originator.getState());

originator.getStateFromMemento(careTaker.get(0));
console.log("저장한 0번째 상태: " + originator.getState());

originator.getStateFromMemento(careTaker.get(1));
console.log("저장한 1번째 상태: " + originator.getState());