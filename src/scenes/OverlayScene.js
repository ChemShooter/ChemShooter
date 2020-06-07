import Phaser from "phaser";
import Dungeon from "@mikewesthad/dungeon";
import Player from "../Player";
import SkeletEnemy from "../enemies/SkeletEnemy";
import MuddyEnemy from "../enemies/MuddyEnemy";
import SwampyEnemy from "../enemies/SwampyEnemy";
import TILES from "../TileMapping";
import TilemapVisibility from "../TilemapVisibility.js";

/**
 * Scene that displays the sprites that overlay the map
 */

// global
var mousehover=false;

export default class OverlayScene extends Phaser.Scene {
  constructor() {
    super({key: 'OverlayScene'});
  }

  init(dungeonScene) {
    this.prevHealth = 100;
    this.dungeonScene = dungeonScene;
  }

  preload() {
    this.load.image('healthcontainer', 'assets/images/healthcontainer.png');
    this.load.image('healthbar', 'assets/images/healthbar.png');
  }

  create() {
    var pauseButton = this.add.text(
      800, 0, '||', {
        font: "18px monospace",
        fill: "#000000",
        padding: {x: 7, y: 7},
        backgroundColor: "#cc96ff"
      })
      .setScrollFactor(0)
      .setDepth(3)
      .setOrigin(1, 0)
      .on('pointerover', () => mousehover = true)
      .on('pointerout', () => mousehover = false)
      .on('pointerdown', () => {
        this.dungeonScene.scene.pause();
        this.scene.launch('PauseScene');
      });
    pauseButton.setInteractive();

    const openPauseScene = () => {
      this.dungeonScene.scene.pause();
      this.scene.launch('PauseScene');
    }

    this.input.keyboard.on('keydown_ESC', openPauseScene);
    this.input.keyboard.on('keydown_P', openPauseScene);

    // Phaser supports multiple cameras, but you can access the default camera like this:
    const camera = this.cameras.main;

    const gameWidth = this.game.config.width;
    const gameHeight = this.game.config.height;

    const healthContainer = this.add.sprite(0, gameHeight, 'healthcontainer');
    healthContainer.setDepth(10).setScrollFactor(0).setOrigin(0, 1).setScale(0.4, 0.4);
    const healthBar = this.add.sprite(healthContainer.x + 46, healthContainer.y - 10, 'healthbar');
    healthBar.setDepth(11).setScrollFactor(0).setOrigin(0, 1).setScale(0.4, 0.4);
    this.healthMask = this.add.sprite(healthBar.x, healthBar.y, 'healthbar');
    this.healthMask.setScrollFactor(0).setOrigin(0, 1).setScale(0.4, 0.4);
    this.healthMask.visible = false;
    healthBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.healthMask);

    // Help text that has a "fixed" position on the screen
    this.add
      .text(16, 16, `Find the stairs. Go deeper.\nCurrent level: ${this.dungeonScene.level}`, {
        font: "18px monospace",
        fill: "#000000",
        padding: {x: 20, y: 10},
        backgroundColor: "#ffffff"
      })
      .setScrollFactor(0).setDepth(3);
  }

  update() {
    if (this.prevHealth === this.game.playerHealth) return;
    this.prevHealth = this.game.playerHealth;
    let stepWidth = this.healthMask.displayWidth / 100;

    this.healthMask.x -= stepWidth;
    if (this.game.playerHealth <= 0) {
      alert("Game over!");
    }
  }
}
