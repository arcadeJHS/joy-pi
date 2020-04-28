joy-pi
=
A **javascript joypad**, made with Raspberry PI, node.js and websockets.

Usage
=
1. ```npm run start:wsserver``` (equivalent to: ```node start:wsserver```)
2. ```npm run connect:hardware``` (equivalent to: ```sudo node HardwareController.js```)
3. Start, in some way, the HTML5 "test cartridge" ```./demo/index.html``` (either by serving static files throught the embedded nodejs http server, or by running the file on an external web server, like the **http-server** module)

Hardware Requirements
=
- Raspberry PI
- node.js (installed on Raspberry PI), and the following modules: **johnny-five**, **raspi-io**, **websocket**
- breadboard
- switches (5)
- 10k ohm resistors (5)
- a bunch of jumper wires
