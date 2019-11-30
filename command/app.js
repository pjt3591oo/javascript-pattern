class Command {
  constructor () {

  }

  excute () {

  }
}

class Light {
  constructor () {
    this.status = false
  }

  press () {
    console.log(`${this.status? 'light on': 'light off'}`)
    this.status = !this.status
  }

}

class Engine {
  constructor () {
    this.status = false
  }

  press () {
    console.log(`${this.status? 'engine on': 'engine off'}`)
    this.status = !this.status
  }
}

class LightCommand extends Command{
  constructor() {
    super()
  }
  lightCommand (light) {
    this.light = light
    console.log(light.press)
  }

  excute () {
    this.light.press()
  }
}

class EngineCommand extends Command {
  constructor () {
    super()
  }

  engineCommand (engine) {
    this.engine = engine
  }

  excute () {
    this.engine.press()
  }
}

class SimpleRemoteControl {
  constructor () {
  }

  setCommand(command) {
    this.slot = command
  }

  buttonWasPressed() {
    this.slot.excute()
  }
}

const remote = new SimpleRemoteControl()

const light = new Light()
const lightCommand = new LightCommand()

lightCommand.lightCommand(light)
remote.setCommand(lightCommand)

remote.buttonWasPressed()
remote.buttonWasPressed()
remote.buttonWasPressed()

const engine = new Engine()
const engineCommand = new EngineCommand()

engineCommand.engineCommand(engine)
remote.setCommand(engineCommand)
remote.buttonWasPressed()
remote.buttonWasPressed()
remote.buttonWasPressed()