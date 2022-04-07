import ClaseEscenaInicial from './ini.js';
import ClaseEscenaNivel1 from './nivel1.js';
import Batalla from './batalla.js';
import Tutorial from './tutorial.js';
import Hub from './hub.js';
import Dialogo from './dialogo.js';


new Phaser.Game({
    type: Phaser.AUTO,
    width: 1000,
    height: 500,
    scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    scene: [ClaseEscenaInicial, ClaseEscenaNivel1, Tutorial, Batalla, Hub, Dialogo],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 900 },
            debug: false
        }
    }
});