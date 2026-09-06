import { DrawCircle, DrawGroup, DrawPath } from "@/components/animation/Draw";
import { constructionDelay } from "@/lib/doorway/construction";
import { polar, regularStar } from "@/lib/doorway/geometry";

function Finial({ x, y, delay, flip = false }: { x: number; y: number; delay: number; flip?: boolean }) {
  return (
    <DrawGroup delay={delay} className={flip ? "origin-center scale-x-[-1]" : ""}>
      <DrawPath d={`M ${x} ${y + 18} Q ${x - 10} ${y + 8} ${x} ${y} Q ${x + 10} ${y + 8} ${x} ${y + 18}`} duration={0.6} strokeWidth={0.7} />
      <DrawCircle cx={x} cy={y} r={2.2} mode="dot" fill="currentColor" stroke="none" />
    </DrawGroup>
  );
}

export function DoorwayOrnaments({ className = "" }: { className?: string }) {
  return (
    <g className={className}>
      <Finial x={78} y={164} delay={7.6} />
      <Finial x={282} y={164} delay={7.72} flip />

      <DrawGroup delay={7.85}>
        <polygon points={regularStar(180, 82, 12, 5, 8)} stroke="currentColor" strokeWidth="0.58" fill="none" vectorEffect="non-scaling-stroke" />
        <DrawCircle cx={180} cy={82} r={2.1} mode="dot" fill="currentColor" stroke="none" />
      </DrawGroup>

      {[150, 180, 210].map((x, i) => {
        const p = polar(x, 96, 7, 270);
        return (
          <DrawPath
            key={`crown-drop-${x}`}
            d={`M ${x} 96 Q ${p.x - 4} 104 ${x} 111 Q ${p.x + 4} 104 ${x} 96`}
            delay={8 + i * 0.12}
            duration={0.5}
            strokeWidth={0.5}
          />
        );
      })}
    </g>
  );
}
