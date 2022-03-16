export default class Ataque extends Phaser.GameObjects.Sprite{

constructor (scene, target, damage, cooldown, priority, barrido, sprite, x, y){  //target = 1 enemigo, = -1 animal
    super(scene, x, y, sprite);
    this.barrido = barrido;
    this.target = target;
    this.damage = damage;
    this.scene.add.existing(this);
}
getTarget(){
    return this.target;
}
esBarrido(){ //true = todos los objetivos, false = selecciona un objetivo a continuación
    return this.barrido;
}
attack(objetivo){
    if(!this.barrido){ //1 target solo
        objetivo.damage(this.target*this.damage);
        objetivo.barra.decrease(this.target*this.damage);
    }
    else{ //barrido
        objetivo.children.each(malo => {
            if(!malo.isDead()){
                malo.damage(this.target*this.damage);
                malo.barra.decrease(this.target*this.damage);
            }
        });
    }
}

}