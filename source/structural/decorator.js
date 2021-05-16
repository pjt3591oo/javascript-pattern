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