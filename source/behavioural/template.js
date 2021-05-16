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