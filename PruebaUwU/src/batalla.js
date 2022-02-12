import Platform from './platform.js';
import Mapache from './mapache.js';
import Pincho from './pincho.js';

export default class Batalla extends Phaser.Scene {

    constructor() {
        super({ key: 'batalla' });
    }


    create() {
        this.mapache = new Mapache(this, 200, 300);
    }
}