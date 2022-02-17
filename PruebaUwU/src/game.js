import ClaseEscenaInicial from './ini.js';
import ClaseEscenaNivel1 from './nivel1.js';
import Batalla from './batalla.js';
import Cosa from './cosa.js';


new Phaser.Game({
    type: Phaser.AUTO,
    width: 1000,
    height: 500,
    scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    scene: [ClaseEscenaInicial, ClaseEscenaNivel1, Batalla, Cosa],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 900 },
            debug: true
        }
    }
});