// Our custom tile mapping with:
// - Single index for putTileAt
// - Array of weights for weightedRandomize
// - Array or 2D array for putTilesAt
const TILE_MAPPING = {
  BLANK: 20,
  WALL: {
    TOP_LEFT: 3,
    TOP_RIGHT: 4,
    BOTTOM_RIGHT: 23,
    BOTTOM_LEFT: 22,
    TOP: {
      TOP_HALF: [{ index: 1, weight: 2 }, { index: [2, 3], weight: 1 }],
      BOTTOM_HALF: [{ index: 11, weight: 2}, { index: [12, 13], weight: 1}]
    },
    LEFT: 81,
    RIGHT: 80,
    BOTTOM: [{ index: 1, weight: 4 }, { index: [78, 79, 80], weight: 1 }]
  },
  FLOOR: [{ index: 51, weight: 9 }, { index: [52, 53], weight: 1 }],
  POT: [{ index: 13, weight: 1 }, { index: 32, weight: 1 }, { index: 51, weight: 1 }],
  DOOR: {
    TOP: [40, 6, 38],
    // prettier-ignore
    LEFT: [
      [40],
      [6],
      [2]
    ],
    BOTTOM: [2, 6, 0],
    // prettier-ignore
    RIGHT: [
      [38],
      [6],
      [0]
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
