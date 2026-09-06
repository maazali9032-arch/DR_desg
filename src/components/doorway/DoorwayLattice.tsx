import { DrawPath } from "@/components/animation/Draw";
import { constructionDelay } from "@/lib/doorway/construction";
import { latticeCrossLines, latticeLines } from "@/lib/doorway/paths";

export function DoorwayLattice({ className = "" }: { className?: string }) {
  return (
    <g className={className}>
      {latticeLines.map((d, i) => (
        <DrawPath
          key={`lattice-a-${i}`}
          d={d}
          delay={constructionDelay("lattice", i, 0.09)}
          duration={0.7}
          strokeWidth={0.42}
          opacity={0.56}
        />
      ))}
      {latticeCrossLines.map((d, i) => (
        <DrawPath
          key={`lattice-b-${i}`}
          d={d}
          delay={constructionDelay("lattice", i, 0.09) + 0.15}
          duration={0.7}
          strokeWidth={0.42}
          opacity={0.56}
        />
      ))}
      <DrawPath d="M 148 298 H 212" delay={7.25} duration={0.6} strokeWidth={0.34} opacity={0.4} />
    </g>
  );
}
