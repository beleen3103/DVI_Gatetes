import Platform from './platform.js';
import Mapache from './mapache.js';
import Pincho from './pincho.js';

export default class Nivel1 extends Phaser.Scene {

    constructor() {
        super({ key: 'nivel1' });
    }


    create() {
        this.mapache = new Mapache(this, 200, 300, true);

        new Platform(this, this.mapache, 500, 350);
        new Platform(this, this.mapache, 850, 200);

        new Pincho(this, this.mapache, 500, 450);
    }

    pinchoPinchado() {
        this.scene.pause();
        this.scene.start('batalla');
    }

}