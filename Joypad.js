/**
 * TODO
 * Maybe add an implementation for a real hardware joystick, like: https://www.play-zone.ch/en/ps2-daumen-joystick-mit-select-button-breakout-board.html
 */

const J5 = require('johnny-five');

class Joypad {

  constructor({ wsConnection, pins, player }) {
    this.wsConnection = wsConnection;
    this.pins = pins;
    this.player = player;
    this.connectPins();
  }

  connectPins() { 
    const buttons = ['up', 'bottom', 'left', 'right', 'fire'];

    buttons.forEach((b) => {
      new J5.Button({ pin: this.pins[b] })
        .on('down', this.sendInput.bind(this, b, 'down'))
        .on('up', this.sendInput.bind(this, b, 'up'));
    });
  }

  sendInput(command, type) {
    this.wsConnection.send(JSON.stringify({ player: this.player, command, type }));
  }

};

module.exports.Joypad = Joypad;