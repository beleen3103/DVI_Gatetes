export default class Ini extends Phaser.Scene {

    constructor() {
        super({ key: 'ini' });
    }

    preload() {
        this.load.setPath('assets/sprites/');
        this.load.image('platform', 'platform.png');
        this.load.image('mapache', 'mapachop.png');
        this.load.image('pincho', 'pincho.png');
        this.load.image('queso', 'queso.png');
    }

    create() {
        this.scene.start('nivel1');
    }
}