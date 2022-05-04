export default class PantallaInicio extends Phaser.Scene {

    constructor(){
        super({ key: 'pantallaInicio' });
    }

    preload(){
        //Cargamos el video de fondo
        this.load.video('fondoInicio', 'assets/background/fondoInicio.webm', 'loadeddata', false, true);
        this.load.audio('musicNoDrums', 'audio/DVI_02.ogg'); //Precargar el audio
    }

    create(){

        this.cameras.main.fadeIn(1000, 0, 0, 0);
        
        this.musica = this.sound.add('musicNoDrums');
        this.musica.play({loop:true, volume:0.1});

        this.video = this.add.video(500,250,'fondoInicio');
        this.video.play(true);
        this.video.setPaused(false);

        this.input.keyboard.once('keydown-E', () => {
            // fade to black
            this.cameras.main.fadeOut(1000, 0, 0, 0);
        })
    
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.musica.stop();
            this.scene.start('tutorial', {x:100,y:490, numeroAnimales: 1, animal1: 'Gato', animal1Vida: 100, animal2: '.', animal2Vida: 0, animal3: '.', animal3Vida: 0, actual: 'Gato', flip: true});
        })

    }
}