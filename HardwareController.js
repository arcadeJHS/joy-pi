const J5 = require('johnny-five');
const RaspiIO = require('raspi-io').RaspiIO;
const WebSocketClient = require('websocket').client;
const config = require('./config.js').config;
const Joypad = require('./Joypad.js').Joypad;

let board = new J5.Board({
  io: new RaspiIO()
});

board.on('ready', () => {

  // Connect the joypad to the websocket server
  let client = new WebSocketClient();
  
  client.on('connect', function (connection) {
    console.log('Board connected to wsServer');
    // init joypad
    const joypad_1 = new Joypad({ wsConnection: connection, pins: config.pins, player: 1 });
  });

  client.connect(config.wsAddress);

});
