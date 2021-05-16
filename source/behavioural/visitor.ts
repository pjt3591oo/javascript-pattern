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

interface ComputerPartVisitor {
	visit(computer: Computer);
	visit(mouse: Mouse);
	visit(keyboard: Keyboard);
	visit(monitor: Monitor);
}

class ComputerPartDisplayVisitor implements ComputerPartVisitor {

  // visit(computer: Computer): void  {
  //    console.log("Displaying Computer.");
  // }

  // visit(mouse: Mouse): void  {
  //    console.log("Displaying Mouse.");
  // }

  // visit(keyboard: Keyboard): void  {
  //    console.log("Displaying Keyboard.");
  // }

  // visit(monitor: Monitor): void  {
  //    console.log("Displaying Monitor.");
  // }
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

let computer: ComputerPart = new Computer();
computer.accept(new ComputerPartDisplayVisitor());