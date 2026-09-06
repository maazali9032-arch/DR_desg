import { DrawPath } from "@/components/animation/Draw";
import { doorwayConstruction } from "@/lib/doorway/construction";
import { doorwayPaths } from "@/lib/doorway/paths";

export function DoorwayColumns({ className = "" }: { className?: string }) {
  const c = doorwayConstruction;

  return (
    <g className={className}>
      <DrawPath d={doorwayPaths.columns.left} delay={c.columns.delay} duration={1.1} strokeWidth={0.82} />
      <DrawPath d={doorwayPaths.columns.right} delay={c.columns.delay + 0.18} duration={1.1} strokeWidth={0.82} />
      <DrawPath d={doorwayPaths.columns.leftCapital} delay={c.capitals.delay} duration={0.7} strokeWidth={0.72} />
      <DrawPath d={doorwayPaths.columns.rightCapital} delay={c.capitals.delay + 0.12} duration={0.7} strokeWidth={0.72} />
      <DrawPath d={doorwayPaths.columns.leftBase} delay={c.capitals.delay + 0.35} duration={0.55} strokeWidth={0.65} />
      <DrawPath d={doorwayPaths.columns.rightBase} delay={c.capitals.delay + 0.47} duration={0.55} strokeWidth={0.65} />
    </g>
  );
}
