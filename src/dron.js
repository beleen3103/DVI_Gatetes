export default class Dron extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, rad, name, listaAnim){
        super(scene, x, y, name);
        this.xIni = x;
        this.yIni = y;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.body.setAllowGravity(false);
        this.listaAnimales = listaAnim;

        
        this.c = this.scene.add.circle(x,y,rad,0x00ff00);
        this.scene.physics.add.existing(this.c);
        this.c.body.setAllowGravity(false);
        this.c.body.setImmovable(true);
        this.c.setVisible(false);
        this.player = this.listaAnimales.getFirstAlive();
        let auxthis = this;
        this.scene.physics.add.collider(this, this.listaAnimales.getChildren(), function(){
            
            auxthis.player.damage(5);
            auxthis.player.barra.decrease(5);

            //auxthis.setActive(false).setVisible(false);
            auxthis.destroy();
        });
    }


    preUpdate(t, dt){
        super.preUpdate(t,dt);
        this.listaAnimales.children.each(anim =>{
            if(anim.active)this.player = anim;
        })
        if(this.scene.physics.overlap(this.c,this.player)){
            this.scene.physics.moveToObject(this, this.player, 120);
        }
        else{
            this.scene.physics.moveTo(this,this.xIni,this.yIni);
        }
    }





}