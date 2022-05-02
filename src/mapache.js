import Animales from './Animales.js'
import Ataque from './ataque.js';
export default class Mapache extends Animales {
    constructor(scene, x, y, f) {
        super(scene, x, y, f, 'Mapache', 100, 300, -600);
        this.scene = scene;
        this.x = x;
        this.y = y;
        
        this.anims.create({
            key: 'andar',
            frames: this.anims.generateFrameNumbers('Mapache', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'parar',
            frames: this.anims.generateFrameNumbers('Mapache', { start: 5, end: 10 }),
            frameRate: 15,
            repeat: 0
        })
        this.anims.create({
            key: 'levantarse',
            frames: this.anims.generateFrameNumbers('Mapache', { start: 10, end: 5 }),
            frameRate: 20,
            repeat: 0
        })
    }

    crearAtaques(){
        this.ataque1 = new Ataque(this.scene, 1, 10, 0, 0, false, false, 0, 'mordisco',90, 430).setInteractive();
        this.ataque2 = new Ataque(this.scene, -1, -10, 0, 0, false, false, 0, 'curacion', 190, 430).setInteractive();
        this.ataque3 = new Ataque(this.scene, 1, 50, 0, 0, true, false, 0, 'cola',290, 430).setInteractive(); //Cambiar daño a 15
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

    rebuscar(index){
        let frases = [];

      /*  if(this.name === "GranVia"){
            frases.push("una máscara de león");
        }*/

        frases.push("una lata de refresco vacía.");
        frases.push("una camiseta rota.");
        frases.push("unos restos de carne. \nEfectivamente, se los ha comido.");
        frases.push("un calcetín sucio.");
        let rand = Phaser.Math.Between(0, frases.length-1);
        index = rand;
        return "El mapache ha encontrado " + frases[rand];
    }
}

