import Animales from './Animales.js'
import Ataque from './ataque.js';
export default class Rata extends Animales {
    constructor(scene, x, y, f) {
        super(scene, x, y, f, 'Rata', 100, 300, -600);
        this.scene = scene;

        this.anims.create({
            key: 'andar',
            frames: this.anims.generateFrameNumbers('Rata', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'parar',
            frames: this.anims.generateFrameNumbers('Rata', { start: 0, end: 0 }),
            frameRate: 15,
            repeat: 0
        })
        this.anims.create({
            key: 'levantarse',
            frames: this.anims.generateFrameNumbers('Rata', { start: 0, end: 0 }),
            frameRate: 20,
            repeat: 0
        })
    }

    crearAtaques() {
        this.ataque1 = new Ataque(this.scene, 1, 15, 0, 0, false, false, 0, 'zarpazo', 90, 430).setInteractive();
        this.ataque2 = new Ataque(this.scene, -1, -10, 0, 0, false, false, 0, 'elAfilador', 190, 430).setInteractive();
        this.ataque3 = new Ataque(this.scene, 1, 10, 0, 0, false, false, 2, 'sangrado', 290, 430).setInteractive();
        this.listaAtaques = this.scene.add.group();
        this.listaAtaques.add(this.ataque1);
        this.listaAtaques.add(this.ataque2);
        this.listaAtaques.add(this.ataque3);
    }
    eliminarAtaques() {
        this.ataque1.nombreAtaque.destroy();
        this.ataque1.destroy();
        this.ataque2.nombreAtaque.destroy();
        this.ataque2.destroy();
        this.ataque3.nombreAtaque.destroy();
        this.ataque3.destroy();
        this.listaAtaques.destroy();
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }


}