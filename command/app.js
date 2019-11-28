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
    console.log(`${this.status? 'on': 'off'}`)
    this.status = !this.status
  }

}

class LightOnCommand extends Command{
  constructor() {
    super()
  }
  LightOnCommand (light) {
    this.light = light
    console.log(light.press)
  }

  excute () {
    this.light.press()
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
const lightOn = new LightOnCommand()

lightOn.LightOnCommand(light)

remote.setCommand(lightOn)

remote.buttonWasPressed()
remote.buttonWasPressed()
remote.buttonWasPressed()
remote.buttonWasPressed()
remote.buttonWasPressed()
remote.buttonWasPressed()
remote.buttonWasPressed()
remote.buttonWasPressed()