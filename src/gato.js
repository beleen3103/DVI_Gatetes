import Animales from './Animales.js'
export default class gato extends Animales {
    constructor(scene, x, y, f) {
        super(scene, x, y, f, 'gato', 100, 300, -600);
        this.scene = scene;
      
    }
    preUpdate(t, dt){ //el gato puede trepar
        super.preUpdate(t,dt);
        this.scene.Plants.children.each(plant =>{
            this.scene.physics.add.overlap(this,plant,()=>{ //this.scene.a deberia ser el nombre dado en la clase tutorial a la enredadera
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
        })
         
    }
    

}
    