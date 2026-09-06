import { OrnamentStage } from "@/components/animation/Draw";
import { DoorwayArch } from "./DoorwayArch";
import { DoorwayCarving } from "./DoorwayCarving";
import { DoorwayColumns } from "./DoorwayColumns";
import { DoorwayDoors } from "./DoorwayDoors";
import { DoorwayFinale } from "./DoorwayFinale";
import { DoorwayFrame } from "./DoorwayFrame";
import { DoorwayLattice } from "./DoorwayLattice";
import { DoorwayOrnaments } from "./DoorwayOrnaments";
import { doorwayPaths } from "@/lib/doorway/paths";
import { doorwayConstruction } from "@/lib/doorway/construction";
import { DrawPath } from "@/components/animation/Draw";

export function DoorwayStage({
  className = "",
  immediate = false,
  compact = false,
}: {
  className?: string;
  immediate?: boolean;
  compact?: boolean;
}) {
  const c = doorwayConstruction;

  return (
    <OrnamentStage
      className={className}
      viewBox="0 0 360 620"
      immediate={immediate}
    >
      <g stroke="currentColor" fill="none">
        <DrawPath d={doorwayPaths.foundation.floor} delay={c.foundation.delay} duration={c.foundation.duration} strokeWidth={1} />
        <DrawPath d={doorwayPaths.foundation.leftBase} delay={c.foundation.delay + 0.18} duration={0.55} strokeWidth={0.75} />
        <DrawPath d={doorwayPaths.foundation.rightBase} delay={c.foundation.delay + 0.28} duration={0.55} strokeWidth={0.75} />

        <DoorwayFrame />
        <DoorwayColumns />
        <DoorwayArch />
        <DoorwayCarving />
        <DoorwayLattice />
        <DoorwayOrnaments />
        <DoorwayDoors />
        <DoorwayFinale />

        {compact && (
          <path
            d="M 104 520 V 220 Q 104 116 180 84 Q 256 116 256 220 V 520"
            stroke="currentColor"
            strokeWidth="0.3"
            opacity="0.16"
            vectorEffect="non-scaling-stroke"
          />
        )}
      </g>
    </OrnamentStage>
  );
}
