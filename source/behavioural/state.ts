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