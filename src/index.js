import Phaser from 'phaser';
import DungeonScene from './DungeonScene';
import PauseScene from './PauseScene';
import OverlayScene from "./OverlayScene";

const config = {
  type: Phaser.AUTO, // Which renderer to use
  width: 800, // Canvas width in pixels
  height: 600, // Canvas height in pixels
  parent: "game-container", // ID of the DOM element to add the canvas to
  pixelArt: true,
  scene: [ DungeonScene, PauseScene, OverlayScene ],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
			debug: false
    }
  },
  extend: {
    playerLevel: 0
  }
};

const game = new Phaser.Game(config);
game.playerHealth = 100;
