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

        this.load.image('dialogogato', 'assets/texts/dialogogato.png');
        this.load.image('dialogomapache', 'assets/texts/dialogomapache.png');

    }

    create(){
        this.cont = 0;
        this.auxt = 0;
        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.cursor = this.input.keyboard.createCursorKeys();
        this.textoMostrado;

        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2; //Centro de la pantalla en X
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2; //Centro de la pantalla en Y

        //Recogemos el archivo JSON en una variable para poder operar con ella:
        //      variable[i] --> posición del array
        //      variable.propiedad --> entrar en una de las propiedades
        this.dialogos = this.cache.json.get(this.nombreJSON);
        console.log(this.dialogos);

        console.log(this.dialogos[1]);

        this.listaPersonajes = [];//Lista de personajes que van a hablar para cargar su imagen de dialogos
        this.listaLength = 0;
        for (let i = 1; i <= this.dialogos['length']; i++){
            console.log(this.dialogos[i]['animal']);
            this.exists = false;
            for(let j = 0; j < this.listaLength; j++){
                if(this.listaPersonajes[j] === 'dialogo' + this.dialogos[i]['animal']){
                    this.exists = true;
                }
            }
            if(!this.exists){
                this.listaPersonajes[this.listaLength] = 'dialogo' + this.dialogos[i]['animal'];
                this.listaLength++;
            }
        }

        console.log(this.listaPersonajes);

        this.contDialogo = 1;


        this.fondoDialogo = this.add.image(20,15,this.listaPersonajes[0]).setOrigin(0);
        this.textoMostrado = this.add.text(136,65,this.dialogos[this.contDialogo]['texto'], {font: "15px Verdana", color: "#71a38d", align: "left"}).setOrigin(0);
        this.contDialogo++;
    }

    update(t,dt){
        super.update(t,dt);
        if(this.keyQ.isDown){
            if(this.auxt <= t){
                this.auxt = t + 200;
                this.textoMostrado.destroy();
                this.fondoDialogo.destroy();

                if(this.contDialogo <= this.dialogos['length']){
                    this.fondoDialogo = this.add.image(20,15,'dialogo'+this.dialogos[this.contDialogo]['animal']).setOrigin(0);
                    this.textoMostrado = this.add.text(136,65,this.dialogos[this.contDialogo]['texto'], {font: "15px Verdana", color: "#71a38d", align: "left"}).setOrigin(0);
                    this.contDialogo = this.contDialogo + 1;
                }
                else{
                    this.scene.stop();
                }

            }
            
        }
    }

}