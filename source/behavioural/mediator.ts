interface ISource {
  setMediator(mediator: Mediator): void;
  eventOccured(event: String): void;
}
class TcpComm implements ISource {
  mediator: Mediator;

  setMediator(mediator: Mediator) { // 중재자 설정
    this.mediator = mediator;
  }

  eventOccured(event: String) { // 이벤트의 전달
    this.mediator.onEvent("TCP comm", event);
  }
}
class SystemSignal implements ISource {
  mediator: Mediator;

  setMediator(mediator: Mediator) { // 중재자 설정
    this.mediator = mediator;
  }

  eventOccured(event: String) { // 이벤트의 전달
    this.mediator.onEvent("System", event);
  }
}


interface IDestination {
  receiveEvent(from: String, event: String): void;
}
class Display implements IDestination {
  receiveEvent(from: String, event: String) {
    console.log("Display : from " + from + " event : " + event);
  }
}
class Log implements IDestination {
  receiveEvent(from: String, event: String) {
    console.log("Log : from " + from + " event : " + event);
  }
}


class Mediator {
  list: IDestination[] = [];

  addDestination(destination: IDestination) {
    this.list.push(destination);
  }

  onEvent(from: String, event: String) {
    this.list.forEach((item: IDestination) => {
      item.receiveEvent(from, event);
    })
  }
}

const mediator: Mediator = new Mediator();

const tcp: ISource = new TcpComm();
tcp.setMediator(mediator);

const system: ISource = new SystemSignal();
system.setMediator(mediator);

mediator.addDestination(new Display());
mediator.addDestination(new Log());

tcp.eventOccured("connected");
tcp.eventOccured("disconnected");

system.eventOccured("Process Killed PID: 1932")