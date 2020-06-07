export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({key: 'GameOverScene'});
  }

  preload() {
    this.load.image("bgImage", "assets/images/main_menu_scene.png");
  }

  init(restartDungeonScene) {
    this.restartDungeonScene = restartDungeonScene;
  }

  create() {
    const {width, height} = this.sys.game.config;
    let background = this.add.sprite(0, 0, 'bgImage');
    background.alpha = 0.5;
    background.setOrigin(0, 0);

    let restartGame = this.add.text(width / 2, height / 2, 'Restart Game', {
      font: "18px monospace",
      fill: "#000000",
      padding: {x: 20, y: 10},
      backgroundColor: "#ffffff"
    })
      .setInteractive()
      .setOrigin(0.5, 0.5)
      .on('pointerdown', () => {
        this.game.playerHealth = 100;
        this.game.playerLevel = 0;
        this.game.elementAmounts = [
          0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0
        ];

        this.restartDungeonScene();
      });
  }
}

