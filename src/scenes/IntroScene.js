export default class IntroScene extends Phaser.Scene {
  constructor() {
    super({key: 'IntroScene'});
  }

  preload() {
    this.load.image("mainM", "assets/images/introscreen_chemshooter.png");
  }

  create() {
    const {width, height} = this.sys.game.config;
    let background = this.add.sprite(0, 0, 'mainM');
    // background.alpha = 0.5;
    background.setOrigin(0, 0);

    let startGame = this.add.text(width/2, height/2-100, 'Start Game', {
      font: "18px monospace",
      fill: "#D84525",
      padding: {x: 20, y: 10},
      backgroundColor: "#4b4b4b"
    })
      .setInteractive()
      .setOrigin(0.5, 0.5)
      .on('pointerdown', () => {
        background.destroy()
        this.scene.stop()
        this.scene.launch('DungeonScene')
      });
  }
}

