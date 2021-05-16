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