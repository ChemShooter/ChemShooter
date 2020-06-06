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
    TOP: {
      TOP_HALF: [{ index: 1, weight: 2 }, { index: [2, 3], weight: 1 }],
      BOTTOM_HALF: [{ index: [12], weight: 1}]
    },
    LEFT: 81,
    RIGHT: 80,
    BOTTOM: [{ index: 1, weight: 4 }, { index: [78, 79, 80], weight: 1 }]
  },
  FLOOR: [{ index: 41, weight: 9 }, { index: [42, 43], weight: 1 }],
  POT: [{ index: 13, weight: 1 }, { index: 32, weight: 1 }, { index: 51, weight: 1 }],
  DOOR: {
    TOP: [
      [93, 41, 92],
      [103, 41, 102]
    ],
    // prettier-ignore
    LEFT: [
      [90, 91],
      [41, 41]
    ],
    BOTTOM: [
      [73, 41, 72],
      [83, 41, 82]
    ],
    // prettier-ignore
    RIGHT: [
      [90, 91],
      [41, 41]
    ]
  },
  CHEST: 166,
  STAIRS: 81,
  // prettier-ignore
  TOWER: [
    [186],
    [205]
  ]
};

export default TILE_MAPPING;
