import Mapache from './mapache.js';
import emo from './emo.js';
import rockero from './rockero.js';
import Gato from './gato.js';
import Rata from './rata.js';
import Animales from './Animales.js';

export default class Batalla extends Phaser.Scene {

    constructor() {
        super({ key: 'batalla' });
        
    }

    init(data){
        this.mainScene = this.scene.get("sceneA name");
        this.escena = data.escena; //nomre de la escena a la que volver
        this.add.image(0, 0, 'vs').setOrigin(0).setScale(1).setDepth(-2);
        this.listaAnimales = this.add.group(); //LISTA PA QUE LOS ANIMALES PEGUEN IGUAL QUE LOS MALOS
        this.numEnemigos = data.numEnemigos;
        this.tipoEnemigo = data.tipoEnemigo;
        let x = 110;
        for(let i=0; i<3; i++){
            if(eval("data.animal"+(i+1)) === "." || eval("data.animal"+(i+1)+"Vida") === 0){ //no hay animal o esta muerto
                this.animal = new Animales(this, null, null, null, '.', 0, null, null);
                this.animal.barra.getBar().setVisible(false);
                this.animal.label.setVisible(false);
                this.animal.setVisible(false);
                eval("this.animal"+(i+1)+"=this.animal");
            }
            else{
                //creamos el animal que sea
                let nombre = eval("data.animal"+(i+1));
                this.animal = eval("new " + nombre +"(this,x,300,false)"); 
                this.animal.setScale(0.9,0.9);
                //asignamos la vida del animal
                let vidaAux = eval("data.animal"+(i+1)+"Vida");
                this.animal.setVida(vidaAux); 
                this.animal.barra.setHealth(vidaAux);
                this.animal.updateScore();
                this.animal.setActive(false);
                
                //lo añadimos al grupo
                eval("this.animal"+(i+1)+"=this.animal");               
                this.listaAnimales.add(eval("this.animal"+(i+1)));
                //posicion para el siguiente animal
                x+=150;
            }
        }
    }

    preload(){
        this.load.audio('MusicaBatalla', 'audio/MusicaBatalla.ogg'); //Precargar el audio
    }

    create() {
        this.musica1 = this.sound.add('MusicaBatalla');
        this.musica1.play({loop:true, volume:0.5});

        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);        
        
        
        this.feedback = this.add.text(600,400,"", { font: "20px Verdana"});
        this.damage = this.add.text(0,0,"", { font: "20px Verdana"});
        this.auxDT = 0;
        this.turn = 0;
        this.turnosAnimales = 1; 
        this.a = null;
        this.atacado = false;
        this.i = 0;
        while(eval("this.animal"+(this.i+1)+".vida") === 0){
            this.i++;
        }
        this.anim = eval("this.animal"+(this.i+1));
        this.anim.crearAtaques();
       
        
        this.generarEnemigos();
       
    }

    generarEnemigos(){
        this.listaMalos = this.add.group();
        this.listaMalos.maxSize = this.numEnemigos;
        let xNpc = 600;
        const yNpc = 250;
        while(!this.listaMalos.isFull()){
            //se genera el tipo de enemigo con el que te hayas chocado
            eval("this.npc = new " + this.tipoEnemigo + "(this, this.listaAnimales.getChildren(), xNpc, xNpc, yNpc, false)");
            this.listaMalos.add(this.npc);
            xNpc += 150;
        }
    }
    update(t,dt){
        super.update(t,dt);
        let siguenVivos = false;
        if(this.turn === 0){
            this.listaMalos.children.each(malo => { //se pueden clickar enemigos
                if(malo.active) {
                    malo.alpha = 0.7;
                }
            }); 
            if(this.atacado){ //siguiente animal
                this.atacado = false;
                
                this.anim.eliminarAtaques();
                
               // if(this.i+1 >= this.listaAnimales.getLength()) this.i = 0;
               // else this.i++;
                this.i++;
                while(eval("this.animal"+(this.i+1)+".vida") === 0) {
                    this.i++;
                    if((this.i+1) > 3) this.i = 0;
                }
                console.log("alimal cogido: " + (this.i+1));
                this.anim = eval("this.animal"+(this.i+1));

                this.anim.crearAtaques();
                
                this.turnosAnimales++;
                
                this.a = null;
            }
            if(this.anim.stuneado === false){
                this.click = true;

                this.anim.listaAtaques.children.each(ataque=>{ //selección de ataque
                    ataque.on('pointerover', () => {ataque.cuadradoVisible(true)});
                    ataque.on('pointerout', () => {ataque.cuadradoVisible(false)});
                    ataque.on('pointerdown', () => {
                        if(this.a === null) this.a = ataque; //si seleccionas un ataque ya no puedes cambiar
                    });
                });
            
                if(this.a != null){
                    if(this.a.getTarget() === 1 && !this.a.esBarrido()){
                        if(this.click){
                        this.turn = 1;
                        this.atacado = true;
                        this.click = false;   
                    
                        }                   
                    }
                    else if(this.a.getTarget() != 1){//curacion
                        if(this.click){
                            if(!this.a.esBarrido()) {
                                this.a.attack(this.anim);
                                this.damage.setFontSize(20);
                                this.damage.text = "+"+ Math.abs(this.a.damage) + "!";
                                this.damage.setPosition(this.anim.x-10, this.anim.y-150);
                            }
                            else {
                                this.a.attack(this.listaAnimales);
                                this.damage.setFontSize(80);
                                this.damage.text = "+" + Math.abs(this.a.damage) + "!";
                                this.damage.setPosition(400, 50);
                            }
                            if(this.turnosAnimales > this.listaAnimales.countActive()) this.turn = 2;
                            //if(this.i+1 >= this.listaAnimales.getLength())this.turn = 2;
                            this.atacado = true;
                            this.click = false;
                        
                        }
                    }
                    else if(this.a.getTarget() === 1 && this.a.esBarrido()){ //ataca a todos
                        if(this.click){
                            this.a.attack(this.listaMalos);
                            //if(this.i+1 >= this.listaAnimales.getLength())this.turn = 2;
                            if(this.turnosAnimales > this.listaAnimales.countActive()) this.turn = 2;
                            this.atacado = true;
                            this.click = false;
                            this.damage.setFontSize(80);
                            this.damage.text = "-" + this.a.damage + "!";
                            this.damage.setPosition(400, 50);
                        }
                    }
                
                    this.auxDT = 0;
                }

            }
            else {
                this.auxDT++;
                if(this.auxDT >= 2000){
                    this.auxDT = 0;
                    this.anim.stuneado = false;
                    this.turn = 2;
                }
            }
            
        }
        else if(this.turn === 1){ //seleccion de enemigo si es necesario
            this.click = true;
            this.listaMalos.children.each(malo => { //se pueden clickar enemigos
                malo.setInteractive();
                if(malo.active) {
                    malo.alpha = 1;
                    malo.on('pointerover', () => {malo.flechaVisible(true);});
                    malo.on('pointerout', () => {malo.flechaVisible(false);}); 
                }
            });  
                this.listaMalos.children.each(malo => {
                    if(!malo.isDead()){
                        malo.on('pointerdown', () => {
                            if(this.click){
                                this.a.attack(malo);
                                this.damage.setFontSize(20);
                                this.damage.text = "-"+this.a.damage + "!";
                                this.damage.setPosition(malo.x-10, malo.y-150);
                                if(this.turnosAnimales > this.listaAnimales.countActive()) this.turn = 2;
                                //if (this.i + 1 === this.listaAnimales.getLength() && this.a.contMulti === 0) this.turn = 2;
                                else if (this.a.contMulti > 0) {
                                    this.a.contMulti = this.a.contMulti - 1;
                                    this.turn = 1;
                                }
                                else this.turn = 0;
                                this.click = false;
                                if(this.turn != 1){this.listaMalos.children.each(malo1 => { //ya no se pueden clickar
                                    malo1.disableInteractive();
                                    malo1.flechaVisible(false);
                                }); 
                                }
                            }
                        });
                    }
                });
            
        }  
        else{
            this.anim.listaAtaques.children.each(ataque=>{ //selección de ataque
                ataque.cuadradoVisible(false);
            });
            this.turnosAnimales = 0;
            this.auxDT += dt;
            if(this.auxDT >= 2000) {
                this.turn = 0;
                let curacion = false;
                let numEnem = 1;
                this.damage.text = "";
                
                this.listaMalos.children.each(malo => { //cada enemigo ataca
                    if(numEnem === 1) this.feedback.text = "";
                    if(malo.active){ //si no esta muerto ya, ataca
                        
                        //primero actualizamos cooldown
                        malo.advance();
                        this.ataqueMalo = malo.selectAttack();
                        this.ataca = Phaser.Math.Between(0, 100);
                        if(this.ataca < 80) {
                            if(this.ataqueMalo.getTarget() === 1) {
                                curacion = true;
                                if(!this.ataqueMalo.esBarrido()) this.target = malo;
                                else this.target = this.listaMalos;
                                this.damage.text = "+";
                                
                            }
                            else{
                                if(this.ataqueMalo.esBarrido()) this.target = this.listaAnimales; //todos los animales;
                                else { //random
                                    let rand = Phaser.Math.Between(0, this.listaAnimales.getLength()-1);
                                    let index = 0;
                                    let seleccionado = false;
                                    let primeroConVida = null;
                                    this.listaAnimales.children.each(animal => {
                                        if(primeroConVida===null && animal.vida>0) primeroConVida = animal;
                                        if(rand === index && !seleccionado){
                                            if(animal.vida>0) {
                                                this.target = animal;
                                                seleccionado = true;
                                            }
                                            else rand++;
                                        }
                                        index++;
                                    });
                                    if(!seleccionado){//si no habia ninguno activo a partir de la posicion rand hay que buscar al principio
                                        this.target = primeroConVida;
                                    }
                                }                  
                                this.damage.text = "-";
                                
                            }
                            this.ataqueMalo.attack(this.target);
                            this.listaAnimales.children.each(anim=>{
                                if(!anim.isDead()) siguenVivos = true;
                                else{
                                    //this.listaAnimales.remove(anim);
                                    anim.label.setVisible(false);
                                    anim.barra.getBar().setVisible(false);
                                    anim.setActive(false).setVisible(false);
                                }
                            });
                            if(!siguenVivos){
                                this.musica1.stop();
                                this.scene.resume(this.escena, {dialogo:false, losed: losed, animal1Vida: this.animal1.vida, animal2Vida: this.animal2.vida, animal3Vida: this.animal3.vida}); //vuelve a la escena del mapa aunque desde el principio, no se guarda el estado
                                this.scene.stop()
                            }
                            if(!this.ataqueMalo.esBarrido()) {
                                this.damage.text += Math.abs(this.ataqueMalo.damage)+"!";
                                this.damage.setPosition(this.target.x-10, this.target.y-150);
                                if(this.ataqueMalo.esStun()){
                                    this.damage.text += " y ha stuneado"
                                }
                            }
                            else{   
                                this.damage.setFontSize(80);
                                this.damage.text += Math.abs(this.ataqueMalo.damage) + "!";
                                this.damage.setPosition(400, 50);
                            }
                            this.feedback.text += malo.textoAtaque(numEnem, this.target, this.ataqueMalo.esBarrido(), curacion);
                            if(this.ataqueMalo.esStun()){
                                this.target.stuneado = true;
                            }
                        }
                        else{
                            this.feedback.text += "¡El " + malo.getName();
                            if(this.listaMalos.getLength() > 1) this.feedback.text +=  " " +numEnem; //si hay mas de un enemigo indica cual falla
                            this.feedback.text += " ha fallado!";

                        }
                        this.feedback.text += "\n";
                    }
                    numEnem++;
                });                
            }
        }
        this.listaMalos.children.each(malo=>{
            if(malo.isDead()){
                malo.label.setVisible(false);
                malo.barra.getBar().setVisible(false);
                malo.setActive(false).setVisible(false);
            }
        })
        
        //para ver si quedan animales vivos
        siguenVivos = false;
        this.listaAnimales.children.each(anim=>{
            if(!anim.isDead()) siguenVivos = true;
            else{
                //this.listaAnimales.remove(anim);
                anim.label.setVisible(false);
                anim.barra.getBar().setVisible(false);
                anim.setActive(false).setVisible(false);
            }
        });
        if(!siguenVivos || this.listaMalos.countActive() === 0) { //ahora mismo solo comprueba que el npc al que podemos pegar esta vivo
            this.musica1.stop();
            let losed = false;
            if(!siguenVivos) losed = true;
            this.scene.resume(this.escena, {dialogo:false, losed: losed, animal1Vida: this.animal1.vida, animal2Vida: this.animal2.vida, animal3Vida: this.animal3.vida}); //vuelve a la escena del mapa aunque desde el principio, no se guarda el estado
            this.scene.stop();
        }
    }
}