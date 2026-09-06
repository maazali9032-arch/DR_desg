import { DrawCircle, DrawPath } from "@/components/animation/Draw";
import { constructionDelay, doorwayConstruction } from "@/lib/doorway/construction";
import { polar } from "@/lib/doorway/geometry";

const carvingArcs = [205, 225, 245, 265, 285, 305, 325];

export function DoorwayCarving({ className = "" }: { className?: string }) {
  const c = doorwayConstruction;

  return (
    <g className={className}>
      {carvingArcs.map((angle, i) => {
        const p = polar(180, 142, 32, angle);
        const q = polar(180, 142, 20, angle);
        return (
          <DrawPath
            key={`carving-${angle}`}
            d={`M ${p.x} ${p.y} Q 180 112 ${q.x} ${q.y}`}
            delay={constructionDelay("carving", i, 0.1)}
            duration={c.carving.duration}
            strokeWidth={0.65}
            opacity={0.78}
          />
        );
      })}

      {[154, 166, 180, 194, 206].map((x, i) => (
        <DrawCircle
          key={`rosette-${x}`}
          cx={x}
          cy={128 - Math.abs(180 - x) * 0.12}
          r={2.2}
          mode="dot"
          delay={6.1 + i * 0.1}
          fill="currentColor"
          stroke="none"
        />
      ))}
    </g>
  );
}
