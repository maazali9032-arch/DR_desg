export const VIEWBOX = "0 0 360 620";

export const doorwayPaths = {
  foundation: {
    floor: "M 54 548 H 306",
    leftBase: "M 72 530 H 122 V 548 H 72 Z",
    rightBase: "M 238 530 H 288 V 548 H 238 Z",
  },
  frame: {
    leftOuter: "M 66 532 V 180 Q 66 82 180 54 Q 294 82 294 180 V 532",
    leftInner: "M 84 532 V 184 Q 84 106 180 78 Q 276 106 276 184 V 532",
    crown: "M 66 180 Q 180 26 294 180",
    crownInner: "M 84 184 Q 180 72 276 184",
  },
  columns: {
    left: "M 76 520 V 194 H 118 V 520",
    right: "M 242 520 V 194 H 284 V 520",
    leftCapital: "M 68 194 H 126 L 118 176 H 76 Z",
    rightCapital: "M 234 176 H 284 L 292 194 H 234 Z",
    leftBase: "M 68 520 H 126 V 532 H 68 Z",
    rightBase: "M 234 520 H 292 V 532 H 234 Z",
  },
  arch: {
    main: "M 112 520 V 244 Q 112 128 180 102 Q 248 128 248 244 V 520",
    inner: "M 128 520 V 246 Q 128 150 180 126 Q 232 150 232 246 V 520",
    trim: "M 142 520 V 250 Q 142 170 180 148 Q 218 170 218 250 V 520",
  },
  doors: {
    left: "M 132 520 V 274 Q 132 184 180 160 V 520 Z",
    right: "M 180 160 Q 228 184 228 274 V 520 H 180 Z",
  },
};

export const latticeLines = Array.from({ length: 7 }, (_, i) => {
  const y = 300 + i * 30;
  return `M 148 ${y} L 180 ${y - 24} L 212 ${y}`;
});

export const latticeCrossLines = Array.from({ length: 6 }, (_, i) => {
  const y = 316 + i * 30;
  return `M 148 ${y} L 180 ${y + 24} L 212 ${y}`;
});
