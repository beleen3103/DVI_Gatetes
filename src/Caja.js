export default class Caja extends Phaser.GameObjects.Sprite {
    constructor(scene, listaAnim, x, y) {
     super(scene, x, y, 'caja');
     this.listaAnim = listaAnim;
     this.scene.add.existing(this);
     this.scene.physics.add.existing(this, true);
     //this.scene.physics.add.collider(this, listaAnim);
     this.body.setSize(150, 90, true);
     this.keyE = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
     this.feedback = this.scene.add.text(310,200,"", { font: "30px Verdana"});
     this.feedback.setScrollFactor(0,0).setDepth(101);
     this.auxDT=0;
   }
 
   preUpdate(t,dt){
     if (this.scene.physics.overlap(this.listaAnim.getChildren(), this)) {
       
         if(Phaser.Input.Keyboard.JustDown(this.keyE)){
           this.listaAnim.children.each(animal => {
               animal.setVida(100);
               animal.barra.setHealth(100);
           })
           
           this.feedback.text = '¡Todos los animales se han curado!';
          
           this.auxDT = 0;
         }
     
     if(this.auxDT < 2000){
       this.auxDT+=dt;
     }
     else this.feedback.text = "";  
   }
 
   }
 }