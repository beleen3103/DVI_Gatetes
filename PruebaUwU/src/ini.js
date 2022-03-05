export default class Ini extends Phaser.Scene {

    constructor() {
        super({ key: 'ini' });
    }

    preload() {
        this.load.setPath('assets/sprites/');
        this.load.image('platform', 'platform.png');
        this.load.image('platformT', 'platformT.png');
        this.load.image('mapache', 'mapachop.png');
        this.load.image('gato', 'gato.png');
        this.load.image('pincho', 'pincho.png');
        this.load.image('queso', 'queso.png');
        this.load.image('npc', 'npc.png');
        this.load.spritesheet('Anime1', 'Anime1.png', { frameWidth: 150, frameHeight: 71 });
        this.load.image('puertaCombate', 'puertaCombate.png');
        this.load.image('puertaPlataformeo', 'puertaPlataformeo.png');
        this.load.image('mordisco', 'mordisco.png');
        this.load.image('curacion', 'curacion.png');
        this.load.setPath('assets/background/');
        this.load.image('vs', 'batalla.jpg');
        
    }

    create() {
        this.scene.start('hub'); //Miquel: hacer que el juego empiece en el hub
    }
}