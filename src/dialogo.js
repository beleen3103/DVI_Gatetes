export default class Dialogo extends Phaser.Scene {

    constructor(){
        super({ key: 'dialogo' });
    }

    create(){
        this.recuadro = this.add.graphics();
        this.recuadro.fillStyle(0xd0c195);
        this.recuadro.fillRect(0,0,1000,150);
        this.cont = 0;
        this.auxt = 0;
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.cursor = this.input.keyboard.createCursorKeys();
        this.textoMostrado;
        this.texto1="Dialogo de prueba. quiero ponerlo en el centro";
        this.texto2="Funciona bien jeje";

        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2; //Centro de la pantalla en X
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2; //Centro de la pantalla en Y

    }

    update(t,dt){
        super.update(t,dt);
        if(this.keyE.isDown){
            if(this.auxt <= t){
                this.auxt = t + 200;
                if(this.cont === 0){
                    this.textoMostrado = this.add.text(this.screenCenterX,50,this.texto1, {font: "20px Verdana", color: "0x000000", align: "center"}).setOrigin(0.5);
                    this.cont = this.cont + 1;
                }
                else if(this.cont === 1){
                    this.textoMostrado.destroy();
                    this.textoMostrado = this.add.text(this.screenCenterX,50,this.texto2, {font: "20px Verdana", color: "0x000000", align: "center"}).setOrigin(0.5);
                    this.cont = this.cont + 1;
                }
                else this.scene.stop();
            }
            
        }
    }

}