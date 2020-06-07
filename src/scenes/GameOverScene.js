export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({key: 'GameOverScene'});
  }

  preload() {
    this.load.image("loseImg", "assets/images/game_over.png");
  }

  init(restartDungeonScene) {
    this.restartDungeonScene = restartDungeonScene;
  }

  create() {
    const {width, height} = this.sys.game.config;
    let background = this.add.sprite(0, 0, 'loseImg');
    background.setOrigin(0, 0);

    let restartGame = this.add.text(width / 2, height / 2-120, 'Restart Game', {
      font: "18px monospace",
      fill: "#D84525",
      padding: {x: 20, y: 10},
      backgroundColor: "#4b4b4b"
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

