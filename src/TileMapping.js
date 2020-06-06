// Our custom tile mapping with:
// - Single index for putTileAt
// - Array of weights for weightedRandomize
// - Array or 2D array for putTilesAt
const TILE_MAPPING = {
  BLANK: 20,
  WALL: {
    TOP_LEFT: [
      [72],
      [82]
    ],
    TOP_RIGHT: [
      [73],
      [83]
    ],
    BOTTOM_LEFT: [
      [92],
      [102]
    ],
    BOTTOM_RIGHT: [
      [93],
      [103]
    ],
    TOP: [
      [1],
      [12]
    ],
    LEFT: 81,
    RIGHT: 80,
  },
  FLOOR: [{ index: 41, weight: 9 }, { index: [42, 43], weight: 1 }],
  BOX: 201,
  DOOR: {
    TOP: [
      [93, 0, 0, 92],
      [103, 0, 0, 102]
    ],
    // prettier-ignore
    LEFT: [
      [90, 91],
      [0, 0],
      [0, 0]
    ],
    BOTTOM: [
      [73, 0, 0, 72],
      [83, 0, 0, 82]
    ],
    // prettier-ignore
    RIGHT: [
      [90, 91],
      [0, 0],
      [0, 0]
    ]
  },
  CHEST: 192,
  STAIRS: 115,
  // prettier-ignore
  TOWER: [
    [55],
    [65]
  ],
  HEART: {
    FULL: 181,
    HALF: 182,
    EMPTY: 183
  }
};

export default TILE_MAPPING;
