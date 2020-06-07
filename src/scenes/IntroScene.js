export default class IntroScene extends Phaser.Scene {
  constructor() {
    super({key: 'IntroScene'});
  }

  preload() {
    this.load.image("bgImage", "assets/images/main_menu_scene.png");
  }

  create() {
    const {width, height} = this.sys.game.config;
    let background = this.add.sprite(0, 0, 'bgImage');
    background.alpha = 0.5;
    background.setOrigin(0, 0);

    let startGame = this.add.text(width / 2, height / 2, 'Start Game', {
      font: "18px monospace",
      fill: "#000000",
      padding: {x: 20, y: 10},
      backgroundColor: "#ffffff"
    })
      .setInteractive()
      .setOrigin(0.5, 0.5)
      .on('pointerdown', () => {
        this.scene.stop()
        this.scene.launch('DungeonScene')
      });
  }
}

