import Animales from './Animales.js'
import Ataque from './ataque.js';
export default class Mapache extends Animales {
    constructor(scene, x, y, f) {
        super(scene, x, y, f, 'Anime1', 100, 300, -600);
        this.scene = scene;
        this.x = x;
        this.y = y;
        
        this.anims.create({
            key: 'andar',
            frames: this.anims.generateFrameNumbers('Anime1', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'parar',
            frames: this.anims.generateFrameNumbers('Anime1', { start: 5, end: 10 }),
            frameRate: 15,
            repeat: 0
        })
        this.anims.create({
            key: 'levantarse',
            frames: this.anims.generateFrameNumbers('Anime1', { start: 10, end: 5 }),
            frameRate: 20,
            repeat: 0
        })
    }

    crearAtaques(){
        this.ataque1 = new Ataque(this.scene, 1, 10, 0, 0, false, 'mordisco',this.x-50, this.y+120).setInteractive();
            this.ataque2 = new Ataque(this.scene, -1, -10, 0 , 0, false, 'curacion', this.x +50, this.y+120).setInteractive();
            this.ataque3 = new Ataque(this.scene, 1, 50, 0, 0, true, 'cola',this.x +150,this.y+120).setInteractive(); //Cambiar daño a 15
            this.listaAtaques = this.scene.add.group();
            this.listaAtaques.add(this.ataque1);
            this.listaAtaques.add(this.ataque2);
            this.listaAtaques.add(this.ataque3);
    }
    eliminarAtaques(){
        this.ataque1.destroy();
        this.ataque2.destroy();
        this.ataque3.destroy();
        this.listaAtaques.destroy();
    }
}

