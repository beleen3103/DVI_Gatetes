export default class Ini extends Phaser.Scene {

    constructor() {
        super({ key: 'ini' });
    }

    preload() {
        this.load.setPath('assets/sprites/');
        this.load.image('platformBasica', 'platform.png');
        this.load.image('platformAtravesable', 'platformT.png');
        this.load.image('platformEnredadera','platformE.png');
        this.load.image('platformRebote','platformR.png');
        this.load.spritesheet('platformRompe', 'platformA.png', { frameWidth: 256, frameHeight: 64 });
        this.load.image('mapache', 'mapachop.png');
        this.load.image('queso', 'queso.png');
        this.load.image('emo', 'emo.png');
        this.load.image('basura','basura.png');
        this.load.spritesheet('Anime1', 'Anime1.png', { frameWidth: 150, frameHeight: 71 });
        this.load.spritesheet('Anime2', 'Anime2.png', { frameWidth: 150, frameHeight: 70 });

        this.load.image('puertaCombate', 'puertaCombate.png');
        this.load.image('puertaPlataformeo', 'puertaPlataformeo.png');
        this.load.image('elAfilador', 'afilar.png');
        this.load.image('zarpazo','arañazo.png');
        this.load.image('sangrado', 'sangrado.png');
        this.load.image('mordisco', 'mordisco.png');
        this.load.image('curacion', 'curacion.png');
        this.load.image('cola', 'cola.png');
        this.load.setPath('assets/background/');
        this.load.image('vs', 'batalla.png');
        
    }

    create() {
        this.scene.start('tutorial', {x:100,y:450, numeroAnimales: 1, animal1: 'Anime2', animal1Vida: 100, animal2: '.', animal2Vida: 0, animal3: '.', animal3Vida: 0, actual: 'Anime2'});
    }
}