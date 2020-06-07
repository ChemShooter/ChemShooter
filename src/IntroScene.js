export default class PauseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseScene' });
    }

    preload() {
        this.load.image("bgImage", "assets/images/main_menu_scene.png");
    }

    create() {
        const { width, height } = this.sys.game.config;
        let background = this.add.sprite(0, 0, 'bgImage');
        background.alpha = 0.5;
        background.setOrigin(0, 0);

        let startGame = this.add.text(width / 2, height / 2, 'Start Game', {
          font: "18px monospace",
          fill: "#000000",
          padding: { x: 20, y: 10 },
          backgroundColor: "#ffffff"
        });
        .setOrigin(0.5, 0.5)
        .on('pointerdown', () => {
          this.scene.stop()
          this.scene.resume('DungeonScene')
        });

        close.setInteractive();

        const hydrogen = this.add.text(
            100, 300, elements[0] + ":" + count[0], {
                font: "12px monospace",
                fill: "#000000",
                padding: { x: 11, y: 20 },
                backgroundColor: "#" + (255).toString(16) + (225-t).toString(16) + (255).toString(16)
        })
        .setInteractive()
        .on('pointerdown', () => {
            console.log(info[0])
        });
        close.on('pointerover', () => { console.log('pointerover'); });
    }
}

