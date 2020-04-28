const http = require('http');
const config = require('./config.js').config;
// https://github.com/theturtle32/WebSocket-Node/tree/1f7ffba2f7a6f9473bcb39228264380ce2772ba7
const WebSocketServer = require('websocket').server;

const WsServer = {

  start: () => {
    let id_counter = 0;
    let active_connections = {};

    const server = http.createServer().listen(config.port, config.ipaddress);

    new WebSocketServer({ httpServer: server })
      .on('request', (request) => {
        let connection = request.accept(null, request.origin);
        let id = id_counter++;
        
        connection.id = id;
        active_connections[id] = connection;

        connection
          .on('message', (message) => {
            // receive a command from hardware peripherals (the joypad, for instance)
            console.log(message.utf8Data);
            for (var con in active_connections) {
              // propagate the command to the listening game
              active_connections[con].send(message.utf8Data);
            }
          })
          .on('close', () => {
            delete active_connections[connection.id];
          });
      });

    console.log(`Server is listening on: ws://${config.address}:${config.port}`);
  }

};

// module.exports.WsServer = WsServer;

WsServer.start();
