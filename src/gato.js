import Animales from './Animales.js'
import Ataque from './ataque.js';
export default class gato extends Animales {
    constructor(scene, x, y, f) {
        super(scene, x, y, f, 'Anime2', 100, 300, -600);
        this.scene = scene;
        this.fisicas = f;
        if(!this.fisicas){
            this.ataque1 = new Ataque(this.scene, 1, 15, 0, 0, false, 'zarpazo',this.x-50, this.y+120);            
            this.ataque2 = new Ataque(this.scene, -1, 10, 0 , 0, false, 'elAfilador', this.x +50, this.y+120);
            this.ataque3 = new Ataque(this.scene, 1, 30, 0, 0, false, 'sangrado',this.x +150,this.y+120);
        }

        this.anims.create({
            key: 'andar',
            frames: this.anims.generateFrameNumbers('Anime2', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'parar',
            frames: this.anims.generateFrameNumbers('Anime2', { start: 5, end: 5 }),
            frameRate: 15,
            repeat: 0
        })
        this.anims.create({
            key: 'levantarse',
            frames: this.anims.generateFrameNumbers('Anime2', { start: 5, end: 5 }),
            frameRate: 20,
            repeat: 0
        })
    }
    preUpdate(t, dt){ //el gato puede trepar
        super.preUpdate(t,dt);
        this.scene.physics.overlap(this,this.scene.Plants,()=>{
            if(this.keyW.isDown)  {
                this.body.velocity.y = -300/2;
            }
            else if(this.keyS.isDown) {
                this.body.velocity.y = 300/2;
            }
            else if((!this.keyW.isDown && !this.keyS.isDown)) {
              this.body.gravity.y = 0;
              this.body.velocity.y = 0;
            }
        });
    }
    

}
    