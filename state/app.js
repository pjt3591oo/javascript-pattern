class StateInterface {
  on () {}
  off () {}
}

class OnState extends StateInterface {
  constructor() {
    super()
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

class OffState extends StateInterface{
  
  constructor() {
    super()
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

let factory = {
  ON: new OnState(),
  OFF: new OffState()
}

class Light {
  constructor () {
    this.state = factory.ON.getInstance()
  }

  showState() {
    console.log(`current state: ${this.state.stateName} \n`)
  }

  setState (state) {
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

