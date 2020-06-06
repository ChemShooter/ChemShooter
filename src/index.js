import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO, // Which renderer to use
  width: 800, // Canvas width in pixels
  height: 600, // Canvas height in pixels
  parent: "game-container", // ID of the DOM element to add the canvas to
  pixelArt: true,
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);
let controls;

function preload() {
  // Runs once, loads up assets like images and audio
  this.load.image("tiles", "assets/tilesets/tuxmon-sample-32px-extruded.png");
  this.load.tilemapTiledJSON("map", "assets/tilemaps/tuxemon-town.json");
}

function create() {
  // Runs once, after all assets in preload are loaded

  const map = this.make.tilemap({ key: "map"});

  // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
  // Phaser's cache (i.e. the name you used in preload)
  const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");
  // const layer = map.createStaticLayer(0, tileset, 0, 0);


  // Phaser supports multiple cameras, but you can access the default camera like this:
  const camera = this.cameras.main;

  // Parameters: layer name (or index) from Tiled, tileset, x, y
  const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
  const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
  const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

  worldLayer.setCollisionByProperty({ collides: true });

  const debugGraphics = this.add.graphics().setAlpha(0.75);

  worldLayer.renderDebug(debugGraphics, {
    tileColor: null, // Color of non-colliding tiles
    collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
  });

  // Set up the arrows to control the camera
  const cursors = this.input.keyboard.createCursorKeys();
  controls = new Phaser.Cameras.Controls.FixedKeyControl({
    camera: camera,
    left: cursors.left,
    right: cursors.right,
    up: cursors.up,
    down: cursors.down,
    speed: 0.5
  });

  // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  this.add.text(16, 16, "Arrow keys to scroll", {
    font: "18px monospace",
    fill: "#ffffff",
    padding: {x: 20, y: 10},
    backgroundColor: "#000000"
  }).setScrollFactor(0);
}

function update(time, delta) {
  // Runs once per frame for the duration of the scene
  controls.update(delta);
}
