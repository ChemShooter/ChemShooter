class pause extends Phaser.Scene {
    constructor() {
        super({key: "pause"});
    }

    preload() {
        this.load.image("bgImage", "assets/images/main_menu_scene.png");
    }

    create() {
        const { width, height } = this.sys.game.config;
        let background = this.add.sprite(0, 0, 'bgImage');
        background.alpha = 0.5;
        background.setOrigin(0, 0);

        let title_text = this.add.text(
            width/2, height/2, 'Clicc for free dmoj points', {
                font: "18px monospace",
                fill: "#000000",
                padding: { x: 20, y: 10 },
                backgroundColor: "#ffffff"
                // align: 'center'
        })
        .setOrigin(0.5, 0.5);

        let close = this.add.text(
            800, 0, 'X', {
                font: "18px monospace",
                fill: "#000000",
                padding: { x: 10, y: 7 },
                backgroundColor: "#ff0000"
        })
        .setOrigin(1, 0)
        .on('pointerdown', () => { console.log('pointerover'); });

        var i;

        for (i = 1; i <= 20; i++) {
            this.add.text(
                400 + (200*(i/10)), 20*i, 'X', {
                    font: "18px monospace",
                    fill: "#000000",
                    padding: { x: 10, y: 7 },
                    backgroundColor: "#ff0000"
            })
        }

        close.setInteractive();
        // close.on('pointerover', () => { console.log('pointerover'); });
    }

    update() {

    }

}

export default pause;

