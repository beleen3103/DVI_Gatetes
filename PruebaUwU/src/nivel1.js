import Platform from './platform.js';
import Mapache from './mapache.js';
import Npc from './npc.js';
import Pincho from './pincho.js';
import Queso from './queso.js';

export default class Nivel1 extends Phaser.Scene {

    constructor() {
        super({ key: 'nivel1' });
    }


    create() {
        this.mapache = new Mapache(this, 200, 300, true);

        new Platform(this, this.mapache, 500, 350);
        new Platform(this, this.mapache, 850, 200);
        new Queso(this, this.mapache, 850, 120);
        new Npc(this, this.mapache, 900, 430, true);
        //new Pincho(this, this.mapache, 500, 450);
    }

    nomnomQuesito(){
        this.scene.start('cosa');
        this.scene.pause();
    }

    pinchoPinchado() {
        this.scene.launch('batalla');
        this.scene.pause();
    }

}