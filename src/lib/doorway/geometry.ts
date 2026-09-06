export type Point = { x: number; y: number };

export function polar(cx: number, cy: number, radius: number, angleDeg: number): Point {
  const a = (angleDeg * Math.PI) / 180;
  return { x: cx + radius * Math.cos(a), y: cy + radius * Math.sin(a) };
}

export function polygon(cx: number, cy: number, radius: number, sides: number, rotation = -90): string {
  return Array.from({ length: sides }, (_, i) => {
    const p = polar(cx, cy, radius, rotation + (360 / sides) * i);
    return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
  }).join(" ");
}

export function regularStar(
  cx: number,
  cy: number,
  outer: number,
  inner: number,
  points: number,
  rotation = -90,
): string {
  return Array.from({ length: points * 2 }, (_, i) => {
    const radius = i % 2 === 0 ? outer : inner;
    const p = polar(cx, cy, radius, rotation + (360 / (points * 2)) * i);
    return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
  }).join(" ");
}

export function arcPath(
  cx: number,
  cy: number,
  radius: number,
  startDeg: number,
  endDeg: number,
): string {
  const start = polar(cx, cy, radius, startDeg);
  const end = polar(cx, cy, radius, endDeg);
  const largeArc = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
  const sweep = endDeg > startDeg ? 1 : 0;
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${radius} ${radius} 0 ${largeArc} ${sweep} ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}

export function mirrorPoints(points: Point[], axisX: number): Point[] {
  return points.map((p) => ({ x: 2 * axisX - p.x, y: p.y }));
}

export function diamond(cx: number, cy: number, w: number, h: number): string {
  return `${cx},${cy - h / 2} ${cx + w / 2},${cy} ${cx},${cy + h / 2} ${cx - w / 2},${cy}`;
}
