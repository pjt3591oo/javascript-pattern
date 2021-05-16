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

// ES6 제너페이터 이용
console.log('============ After ES6 ============')

function* Generator (target) {
  for(item in target) {
    yield item;
  }
}

const _iterator = Generator(items);

for (item of _iterator) {
  console.log(item)
}