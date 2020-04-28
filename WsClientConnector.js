export default class WsClientConnector {

  constructor({ inputHandler, wsAddress }) {
    this.inputHandler = inputHandler;
    this.ws = new WebSocket(wsAddress);
    this.connect();
  }

  connect() { 
    this.ws.addEventListener('open', () => {
      this.ws.addEventListener('message', this.onMessage.bind(this));
    });
  }

  onMessage(e) {
    const action = JSON.parse(e.data);
    console.log(action);
    this.inputHandler(action);
  }

};