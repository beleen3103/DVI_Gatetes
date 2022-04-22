export default class Basura extends Phaser.GameObjects.Sprite {
   constructor(scene, listaAnim, player, x, y) {
    super(scene, x, y, 'basura');
    this.player = player;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    this.scene.physics.add.collider(this, listaAnim);
    this.body.setSize(150, 90, true);
    this.keyE = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.feedback = this.scene.add.text(310,200,"", { font: "30px Verdana"});
    this.feedback.setScrollFactor(0,0).setDepth(101);
    this.auxDT=0;
  }

  preUpdate(t,dt){
    if (this.scene.physics.overlap(this.player, this)) {
      if(this.player.getName()=== 'Mapache'){
        if(this.keyE.onDown()){
          let index = -1;
          
          this.feedback.text = this.player.rebuscar(index);
          if(index === 0) //dialogo de Hmmm... que raros son los humanos
          this.auxDT = 0;
        }
    }
    if(this.auxDT < 2000){
      this.auxDT+=dt;
    }
    else this.feedback.text = "";  
  }

  }
}
