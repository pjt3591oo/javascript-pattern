class Flyweight{
  map: {[key: string]: Subject} = {};
 
  getSubject( name: string ): Subject {
    let subject: Subject = this.map[name];

    if(!subject){
      subject = new Subject(name);
      this.map[name] = subject;
    }

    return subject;
  }
}

class Subject{
  name: string;

  constructor( name: string){
    this.name = name;
    console.log("create : " + name);
  }
}

const flyweight: Flyweight = new Flyweight();

flyweight.getSubject("a");
flyweight.getSubject("a"); // 다시 생성하지 않음
flyweight.getSubject("b");
flyweight.getSubject("b"); // 다시 생성하지 않음