import Platform from './platform.js';
import Mapache from './mapache.js';
import Pincho from './pincho.js';
import Queso from './queso.js';

export default class Cosa extends Phaser.Scene {

    constructor() {
        super({ key: 'cosa' });
    }
    

    create() {
        this.mapache = new Mapache(this, 200, 300, true);

        new Platform(this, this.mapache, 500, 350);
        new Platform(this, this.mapache, 850, 200);
        new Queso(this, this.mapache, 850, 120);
        this.cameras.main.startFollow(this.mapache);
    }

    nomnomQuesito(){
        this.scene.pause();
        this.scene.start('nivel1');
    }

}