export default class Dialogo extends Phaser.Scene {

    constructor(){
        super({ key: 'dialogo' });
    }

    init(data){
        this.nombreJSON = data.nombreJSON;
        console.log(typeof(this.nombreJSON))
    }

    preload(){
        //Cargamos el archivo
        this.load.json(this.nombreJSON, 'dialogos/' + this.nombreJSON);
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

        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2; //Centro de la pantalla en X
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2; //Centro de la pantalla en Y

        //Recogemos el archivo JSON en una variable para poder operar con ella:
        //      variable[i] --> posición del array
        //      variable.propiedad --> entrar en una de las propiedades
        this.dialogos = this.cache.json.get(this.nombreJSON);
        console.log(this.dialogos);

        this.contDialogo = 1;

    }

    update(t,dt){
        super.update(t,dt);
        if(this.keyE.isDown){
            if(this.auxt <= t){
                this.auxt = t + 200;

                if(this.contDialogo !== 1){
                    this.textoMostrado.destroy();

                }
                if(this.contDialogo <= this.dialogos['length']){
                    this.textoMostrado = this.add.text(this.screenCenterX,50,this.dialogos[this.contDialogo], {font: "20px Verdana", color: "0x000000", align: "center"}).setOrigin(0.5);
                    this.contDialogo = this.contDialogo + 1;
                }
                else{
                    this.scene.stop();
                }

            }
            
        }
    }

}