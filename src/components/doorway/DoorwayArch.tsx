import { DrawPath } from "@/components/animation/Draw";
import { doorwayConstruction } from "@/lib/doorway/construction";
import { doorwayPaths } from "@/lib/doorway/paths";

export function DoorwayArch({ className = "" }: { className?: string }) {
  const c = doorwayConstruction;

  return (
    <g className={className}>
      <DrawPath d={doorwayPaths.arch.main} delay={c.arch.delay} duration={c.arch.duration} strokeWidth={1.2} />
      <DrawPath d={doorwayPaths.arch.inner} delay={c.archTrim.delay} duration={c.archTrim.duration} strokeWidth={0.75} opacity={0.8} />
      <DrawPath d={doorwayPaths.arch.trim} delay={c.archTrim.delay + 0.45} duration={1.15} strokeWidth={0.55} opacity={0.65} />
    </g>
  );
}
