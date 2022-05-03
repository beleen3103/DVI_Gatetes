import Barra from './healthBar.js';
import Personajes from './Personajes.js';
export default class Enemigos extends Personajes {
  
  constructor(scene, listaAnim, x, y, f, npc, vida) {
    super(scene, x, y, f, npc, vida, 40, 110, 70);
    this.flecha = scene.add.image(x,y - 130, 'flecha').setVisible(false);
    
  }
 
  flechaVisible(visible){  
      this.flecha.setVisible(visible);
  }

  advance(){
    this.listaAtaques.children.each(at => {
         at.advance();                   
    });
  }

  selectAttack(){
    this.ataque = null;
    if(this.ataque1.getCooldown() === 0) this.ataque = this.ataque1;
    if(this.ataque2.getCooldown() === 0) {
      if(this.ataque === null) this.ataque = this.ataque2;
      else if(this.ataque.getPriority() > this.ataque2.getPriority()) this.ataque = this.ataque2;
    }
    if(this.ataque3.getCooldown() === 0) {
      if(this.ataque === null) this.ataque = this.ataque3;
      else if(this.ataque.getPriority() > this.ataque3.getPriority()) this.ataque = this.ataque3;
    }


    this.ataque.resetCooldown();
    return this.ataque;
  }

  textoAtaque(index, target, varios, curacion){
    if(varios){
      if(!curacion) return "¡El "+ this.getName() + " " + index + " ha golpeado a todos \nlos animales!";
      else return "¡El "+ this.getName() + " " + index + " ha curado a todos \nsus aliados!";
    } 
    else{
      if(curacion) return "El " + target.getName() + " " + index+ " se ha curado";
      else return "El "+ this.getName() + " " + index + " ha golpeado al " + target.getName();
    }
  }
}