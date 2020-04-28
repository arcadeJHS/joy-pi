/**
 * TODO
 * Virtually also the keyboard should communicate through the websocket, to better simulate the connection.
 */

export default class KeyboardController {

    constructor({ inputHandler }) {
        this.inputHandler = inputHandler;
        document.addEventListener('keydown', this.onKeyDown.bind(this));
    }

    onKeyDown(e) {
        const mappedKeys = {
            ArrowUp: { command: 'up' },
            ArrowDown: { command: 'down' },
            ArrowLeft: { command: 'left' },
            ArrowRight: { command: 'right' },
            Space: { command: 'fire' }
        };

        const action = mappedKeys[e.code];

        if (!action) return;

        this.inputHandler({ ...action, type: 'down' });
    }

};
