class StateInterface {
  on () {}
  off () {}
}

class OnState extends StateInterface {
  constructor() {
    super()
    this.stateName = 'ON'
  }
  
  static getInstance () {
    OnState.instance = OnState.instance ? OnState.instance : new OnState()
    return OnState.instance
  }

  on (light) {
    light.setState(OnState.getInstance())
    console.log('... 동작하지 않음')
  }

  off (light) {
    light.setState(OffState.getInstance())
    console.log('전원 off')
  }
}

class OffState extends StateInterface{
  
  constructor() {
    super()
    this.stateName = 'OFF'
  }
  
  static getInstance () {
    OffState.instance = OffState.instance ? OffState.instance : new OffState()
    return OffState.instance
  }

  on (light) {
    light.setState(OnState.getInstance())
    console.log('전원 on')
  }

  off (light) {
    light.setState(OffState.getInstance())
    console.log('... 동작하지 않음')
  }
}

class Light {
  constructor () {
    this.state = OffState.getInstance()
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