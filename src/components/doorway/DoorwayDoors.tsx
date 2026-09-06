import { DrawCircle, DrawPath } from "@/components/animation/Draw";
import { doorwayConstruction } from "@/lib/doorway/construction";
import { doorwayPaths } from "@/lib/doorway/paths";

export function DoorwayDoors({ className = "" }: { className?: string }) {
  const c = doorwayConstruction;

  return (
    <g className={className}>
      <DrawPath d={doorwayPaths.doors.left} delay={c.doors.delay} duration={1.4} strokeWidth={1} />
      <DrawPath d={doorwayPaths.doors.right} delay={c.doors.delay + 0.2} duration={1.4} strokeWidth={1} />
      <DrawPath d="M 180 164 V 520" delay={c.handles.delay} duration={0.8} strokeWidth={0.5} opacity={0.6} />
      <DrawCircle cx={174} cy={342} r={2.3} mode="dot" delay={c.handles.delay + 0.15} fill="currentColor" stroke="none" />
      <DrawCircle cx={186} cy={342} r={2.3} mode="dot" delay={c.handles.delay + 0.28} fill="currentColor" stroke="none" />
    </g>
  );
}
