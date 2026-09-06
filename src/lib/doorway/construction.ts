export const doorwayConstruction = {
  foundation: { delay: 0.1, duration: 0.9 },
  frameOuter: { delay: 0.8, duration: 2.4 },
  frameInner: { delay: 1.7, duration: 2.0 },
  columns: { delay: 2.8, duration: 1.2 },
  capitals: { delay: 3.5, duration: 0.8 },
  arch: { delay: 4.0, duration: 2.0 },
  archTrim: { delay: 5.0, duration: 1.5 },
  carving: { delay: 5.8, duration: 0.9 },
  lattice: { delay: 6.5, duration: 1.4 },
  ornaments: { delay: 7.6, duration: 1.2 },
  doors: { delay: 8.6, duration: 1.5 },
  handles: { delay: 9.4, duration: 0.6 },
  finale: { delay: 10.1, duration: 1.2 },
} as const;

export type ConstructionKey = keyof typeof doorwayConstruction;

export function constructionDelay(key: ConstructionKey, index = 0, stagger = 0.08) {
  return doorwayConstruction[key].delay + index * stagger;
}
