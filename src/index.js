import Phaser from 'phaser';
import DungeonScene from './scenes/DungeonScene';
import PauseScene from './scenes/PauseScene';
import OverlayScene from "./scenes/OverlayScene";
import IntroScene from "./scenes/IntroScene";
import GameOverScene from "./scenes/GameOverScene";

export function showFormulas() {
}

const config = {
  type: Phaser.AUTO, // Which renderer to use
  width: 800, // Canvas width in pixels
  height: 600, // Canvas height in pixels
  parent: "game-container", // ID of the DOM element to add the canvas to
  pixelArt: true,
  scene: [ IntroScene, DungeonScene, PauseScene, OverlayScene, GameOverScene ],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
			debug: false
    }
  },
};

const game = new Phaser.Game(config);
game.playerHealth = 100;
game.isPaused = false;
game.elementAmounts = [
  0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0
];
