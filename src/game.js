import ClaseEscenaInicial from './ini.js';
import ClaseEscenaNivel1 from './GranVia.js';
import ClaseEscenaNivel2 from './callao.js';
import Batalla from './batalla.js';
import Tutorial from './tutorial.js';
import Hub from './hub.js';
import Dialogo from './dialogo.js';
import Alcantarilla from './Alcantarilla.js';
import PantallaInicio from './pantallaInicio.js';
import GameOver from './gameover.js';


new Phaser.Game({
    type: Phaser.AUTO,
    width: 1000,
    height: 500,
    scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    scene: [ClaseEscenaInicial, ClaseEscenaNivel1, ClaseEscenaNivel2, PantallaInicio, Tutorial, Batalla, Hub, Dialogo, Alcantarilla, GameOver],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 900 },
            debug: true
        }
    }
});