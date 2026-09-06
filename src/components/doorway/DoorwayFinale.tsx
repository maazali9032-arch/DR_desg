import { DrawCircle, DrawPath } from "@/components/animation/Draw";
import { doorwayConstruction } from "@/lib/doorway/construction";

export function DoorwayFinale({ className = "" }: { className?: string }) {
  const c = doorwayConstruction;

  return (
    <g className={className}>
      <DrawPath d="M 54 548 H 306" delay={c.finale.delay} duration={0.8} strokeWidth={0.9} />
      <DrawPath d="M 88 556 H 272" delay={c.finale.delay + 0.15} duration={0.65} strokeWidth={0.45} opacity={0.65} />
      <DrawCircle cx={180} cy={82} r={18} delay={c.finale.delay + 0.2} duration={0.8} strokeWidth={0.4} opacity={0.4} />
      <DrawPath d="M 160 82 H 200 M 180 62 V 102" delay={c.finale.delay + 0.35} duration={0.6} strokeWidth={0.35} opacity={0.4} />
    </g>
  );
}
