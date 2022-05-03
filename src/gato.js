import Animales from './Animales.js'
import Ataque from './ataque.js';
export default class Gato extends Animales {
    constructor(scene, x, y, f) {
        super(scene, x, y, f, 'Gato', 100, 300, -600);
        this.scene = scene;     
        
        this.anims.create({
            key: 'andar',
            frames: this.anims.generateFrameNumbers('Gato', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'parar',
            frames: this.anims.generateFrameNumbers('Gato', { start: 5, end: 5 }),
            frameRate: 15,
            repeat: 0
        });
        this.anims.create({
            key: 'levantarse',
            frames: this.anims.generateFrameNumbers('Gato', { start: 5, end: 5 }),
            frameRate: 20,
            repeat: 0
        });
        this.anims.create({
            key: 'trepa',
            frames: this.anims.generateFrameNumbers('Gato', { start: 6, end: 11 }),
            frameRate: 12,
            repeat: 0
        });
    }
    
    crearAtaques(){
        this.ataque1 = new Ataque(this.scene, 1, 15, 0, 0, false, false, 0, 'zarpazo',90, 430).setInteractive();            
        this.ataque2 = new Ataque(this.scene, -1, -10, 0, 0, false, false, 0, 'elAfilador', 190, 430).setInteractive();
        this.ataque3 = new Ataque(this.scene, 1, 100, 0, 0, false, false, 0, 'sangrado',290,430).setInteractive();
            this.listaAtaques = this.scene.add.group();
            this.listaAtaques.add(this.ataque1);
            this.listaAtaques.add(this.ataque2);
            this.listaAtaques.add(this.ataque3);
    }
    eliminarAtaques(){
        this.ataque1.nombreAtaque.destroy();
        this.ataque1.destroy();
        this.ataque2.nombreAtaque.destroy();
        this.ataque2.destroy();
        this.ataque3.nombreAtaque.destroy();
        this.ataque3.destroy();
        this.listaAtaques.destroy();
    }

    preUpdate(t, dt){ //el gato puede trepar
        super.preUpdate(t,dt);
    }
    

}
    