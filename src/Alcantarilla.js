export default class Alcantarilla extends Phaser.Scene {
    
    constructor() {
        super({ key: 'Alcantarilla' });
    }
    preload(){
        this.load.tilemapTiledJSON('Alcantarilla','assets/sprites/Alcantarilla.json');
        this.load.image('plataformas', 'assets/sprites/tiles2.png');
    }

    create(){
        this.createMap();
    }
    createMap(){
        this.map = this.make.tilemap({
            key:'Alcantarilla',
            tileWidth: 30,
            tileHeight: 30
        });

        const tileset1 = this.map.addTilesetImage('A','plataformas'); //hay que empotrar los tileset en el TILED (boton inferior derecho)
        this.capa = this.map.createLayer('Alcantarilla', tileset1);
        this.capa.setCollisionByProperty({colisiona: true});
        this.physics.add.collider(this.listaAnimales,this.capa);
        
        if(this.physics.getConfig().debug){
            const debug = this.add.graphics().setAlpha(0.7)
            this.capa.renderDebug(debug,{
                tileColor: null,
                collidingTileColor: new Phaser.Display.Color(243,234,48,255),
                faceColor: new Phaser.Display.Color(40,39,37,255)
            });
        }
    }



}