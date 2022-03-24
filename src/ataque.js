export default class Ataque extends Phaser.GameObjects.Sprite{

constructor (scene, target, damage, cooldown, priority, barrido, sprite, x, y){  //target = 1 enemigo, = -1 animal
    //si el daño es negativo = curacion
    super(scene, x, y, sprite);
    this.cooldownIni = cooldown;
    this.cooldown = cooldown;
    this.priority = priority;
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
resetCooldown(){
    this.cooldown = this.cooldownIni;
}
getCooldown(){
    return this.cooldown;
}
getPriority(){
    return this.priority;
}
advance(){ //en cada turno el cooldown baja 1
    if(this.cooldown > 0) this.cooldown -= 1;
    //else this.cooldown = cooldo
}
attack(objetivo){
    if(!this.barrido){ //1 target solo
        objetivo.damage(this.damage);
        objetivo.barra.decrease(this.damage);
    }
    else{ //barrido
        objetivo.children.each(malo => {
            if(!malo.isDead()){
                malo.damage(this.damage);
                malo.barra.decrease(this.damage);
            }
        });
    }
}

}
