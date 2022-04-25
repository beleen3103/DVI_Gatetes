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
        this.load.image('queso', 'queso.png');
        this.load.image('emo', 'emo.png');
        this.load.image('basura','basura.png');
        this.load.spritesheet('Mapache', 'Mapache.png', { frameWidth: 150, frameHeight: 71 });
        this.load.spritesheet('Gato', 'Gato.png', { frameWidth: 150, frameHeight: 70 });

        this.load.image('puertaCombate', 'puertaCombate.png');
        this.load.image('puertaPlataformeo', 'puertaPlataformeo.png');
        this.load.image('flecha', 'flecha.png');
        this.load.image('elAfilador', 'afilar.png');
        this.load.image('zarpazo','arañazo.png');
        this.load.image('sangrado', 'sangrado.png');
        this.load.image('mordisco', 'mordisco.png');
        this.load.image('curacion', 'curacion.png');
        this.load.image('cola', 'cola.png');
        this.load.image('granviaB', 'granvia.png')
        this.load.setPath('assets/background/');
        this.load.image('vs', 'batalla.png');
        
    }

    create() {
        this.scene.start('tutorial', {x:100,y:490, numeroAnimales: 2, animal1: 'Gato', animal1Vida: 100, animal2: 'Mapache', animal2Vida: 60, animal3: '.', animal3Vida: 0, actual: 'Gato', flip: true});
    }
}