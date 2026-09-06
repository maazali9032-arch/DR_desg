import { DrawCircle, DrawPath } from "@/components/animation/Draw";
import { doorwayConstruction } from "@/lib/doorway/construction";

export function DoorwayFinale({ className = "" }: { className?: string }) {
  const c = doorwayConstruction;

  return (
    <g className={className}>
      <DrawPath d="M 54 548 H 306" delay={c.finale.delay} duration={0.8} strokeWidth={0.65} />
      <DrawPath d="M 88 556 H 272" delay={c.finale.delay + 0.15} duration={0.65} strokeWidth={0.34} opacity={0.48} />
      <DrawCircle cx={180} cy={82} r={18} delay={c.finale.delay + 0.2} duration={0.8} strokeWidth={0.3} opacity={0.25} />
      <DrawPath d="M 160 82 H 200 M 180 62 V 102" delay={c.finale.delay + 0.35} duration={0.6} strokeWidth={0.25} opacity={0.25} />
    </g>
  );
}
