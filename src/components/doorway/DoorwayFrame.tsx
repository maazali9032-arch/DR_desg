import { DrawPath } from "@/components/animation/Draw";
import { doorwayConstruction } from "@/lib/doorway/construction";
import { doorwayPaths } from "@/lib/doorway/paths";

export function DoorwayFrame({ className = "" }: { className?: string }) {
  const c = doorwayConstruction;

  return (
    <g className={className}>
      <DrawPath d={doorwayPaths.frame.leftOuter} delay={c.frameOuter.delay} duration={c.frameOuter.duration} strokeWidth={0.9} />
      <DrawPath d={doorwayPaths.frame.crown} delay={c.frameOuter.delay + 0.35} duration={1.8} strokeWidth={0.9} />
      <DrawPath d={doorwayPaths.frame.leftInner} delay={c.frameInner.delay} duration={c.frameInner.duration} strokeWidth={0.5} opacity={0.62} />
      <DrawPath d={doorwayPaths.frame.crownInner} delay={c.frameInner.delay + 0.2} duration={1.5} strokeWidth={0.5} opacity={0.62} />
    </g>
  );
}
