import KeyboardController from '/KeyboardController.js';
import JoypadController from '/JoypadClientController.js';

(() => {
    // set
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext('2d');
    const labelX = document.querySelector("#x");
    const labelY = document.querySelector("#y");
    const labelBullet = document.querySelector("#bullet");
    const speed = 10;
    const squareW = 40;

    let x = 180;
    let y = 400;
    let bulletX = 0;
    let bulletY = 0;
    
    canvas.width = 400;
    canvas.height = 500;

    // update
    const update = (button) => {
        if (!button || button.type != 'down') return;

        ({
            up: () => {
                y = (y <= 0) ? 0 : y - speed;
            },
            bottom: () => {
                y = (y + squareW >= canvas.height) ? canvas.height - squareW : y + speed;
            },
            left: () => { 
                x = (x <= 0) ? 0 : x - speed;
            },
            right: () => {
                x = (x + squareW >= canvas.width) ? canvas.width - squareW : x + speed;
            },
            fire: () => { 
                bulletX = x;
                bulletY = y;
            }
        })[button.command]();
    }

    // draw
    const draw = (timestamp) => {
        // clear canvas
        ctx.fillStyle = "#eee";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // render player
        ctx.fillStyle = "#00979C";
        ctx.fillRect(x, y, 40, 40);

        // render bullet
        if (bulletY > 0) {
            ctx.fillStyle = "#fc0";
            ctx.fillRect(bulletX + 15, bulletY, 10, 10);
            bulletY -= 10;
        }

        // render labels
        labelX.textContent = x;
        labelY.textContent = y;
        labelBullet.textContent = bulletX + '/' + bulletY;

        requestAnimationFrame(draw);
    };

    // Keyboard controller (for debugging purpose)
    new KeyboardController({ inputHandler: update });

    // Joypad controller
    new JoypadController({ inputHandler: update, wsAddress: "ws://192.168.43.186:8000" });

    // Start rendering
    requestAnimationFrame(draw);

})();