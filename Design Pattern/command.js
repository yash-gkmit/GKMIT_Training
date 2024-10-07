

//////////////  Command Pattern




///////////// Good example
class Light {
  constructor() {
    this.isOn = false;
  }
  on() {
    this.isOn = true;
    console.log('Light is on');
  }
  off() {
    this.isOn = false;
    console.log('Light is off');
  }
}


class LightOnCommand {
  constructor(light) {
    this.light = light;
  }
  execute() {
    this.light.on();
  }
}


class LightOffCommand {
  constructor(light) {
    this.light = light;
  }
  execute() {
    this.light.off();
  }
}


const light = new Light();
const lightOnCommand = new LightOnCommand(light);
const lightOffCommand = new LightOffCommand(light);


const remoteControl = {
  executeCommand: function(command) {
    command.execute();
  }
};


remoteControl.executeCommand(lightOnCommand);
remoteControl.executeCommand(lightOffCommand);




////////////Bad example


function turnLightOn() {
  console.log('Light is on');
}


function turnLightOff() {
  console.log('Light is off');
}


const remoteControl = {
  on: turnLightOn,
  off: turnLightOff
};


remoteControl.on();
remoteControl.off();