import Animales from './Animales.js'
export default class gato extends Animales {
    constructor(scene, x, y, f) {
        super(scene, x, y, f, 'gato', 100, 300, -900);
        this.scene = scene;
      
    }
    /*preUpdate(t, dt){ //el gato puede trepar
        super.preUpdate(t,dt);
        //meter las enredaderas de la zona en un grupo
        this.scene.physics.add.overlap(this,this.scene.a,()=>{ //this.scene.a deberia ser el nombre del GRUPO que contiene todas las plataformas Enredadera
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
    */

}
    